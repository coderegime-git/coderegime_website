/**
 * Code Regime - Career Page & Job Application Script
 * Pure Client-Side Resume Parsing & Dynamic Auto-Fill (pdf.js & mammoth.js)
 * Python Flask SMTP Backend Integration for Application Submission (port 8002)
 */

document.addEventListener('DOMContentLoaded', function () {
  // Configure PDF.js worker if available
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  const form = document.getElementById('careerForm');
  const fileZone = document.getElementById('fileUploadZone');
  const fileInput = document.getElementById('resumeInput');
  const fileCard = document.getElementById('selectedFileCard');
  const fileNameDisplay = document.getElementById('selectedFileName');
  const fileSizeDisplay = document.getElementById('selectedFileSize');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const parsingIndicator = document.getElementById('parsingIndicator');
  const autofillAlert = document.getElementById('autofillAlert');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = document.getElementById('submitSpinner');
  const btnText = document.getElementById('submitBtnText');

  let selectedFile = null;

  // Allowed file extensions and max size (5 MB)
  const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Format file size helper
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  // =========================================================================
  // Pure Client-Side Text Extraction & Heuristic Resume Parser
  // =========================================================================

  /**
   * Extract plain text from PDF using PDF.js in the browser
   */
  async function extractTextFromPDF(file) {
    if (!window.pdfjsLib) {
      console.warn('PDF.js not loaded, skipping PDF text extraction');
      return '';
    }
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageItems = textContent.items.map(item => item.str);
      fullText += pageItems.join(' ') + '\n';
    }
    return fullText;
  }

  /**
   * Extract plain text from DOCX using Mammoth.js in the browser
   */
  async function extractTextFromDOCX(file) {
    if (!window.mammoth) {
      console.warn('Mammoth.js not loaded, skipping DOCX text extraction');
      return '';
    }
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value || '';
  }

  /**
   * Extract text from file depending on format
   */
  async function extractTextFromFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'pdf') {
      return await extractTextFromPDF(file);
    } else if (ext === 'docx') {
      return await extractTextFromDOCX(file);
    } else if (ext === 'doc') {
      // Legacy .doc binary: attempt basic ASCII string extraction as fallback
      try {
        const text = await file.text();
        const printable = text.replace(/[^\x20-\x7E\t\r\n]/g, ' ');
        return printable;
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  /**
   * Parse extracted raw text to detect candidate details
   */
  function parseResumeContent(text) {
    if (!text || text.trim().length === 0) return null;

    const data = {};
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

    // 1. Email Address
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/i);
    if (emailMatch) {
      data.email = emailMatch[0].trim();
    }

    // 2. Phone Number & Country Code
    // Matches Indian 10-digit mobile or international formats
    const phoneMatch = text.match(/(?:\+?(\d{1,3})[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?(\d{3,5}[-.\s]?\d{4,5})\b/);
    if (phoneMatch) {
      const rawNumber = phoneMatch[0].replace(/[^\d+]/g, '');
      if (rawNumber.startsWith('+91')) {
        data.countryCode = '+91';
        data.phone = rawNumber.slice(3).slice(-10);
      } else if (rawNumber.startsWith('+1')) {
        data.countryCode = '+1';
        data.phone = rawNumber.slice(2).slice(-10);
      } else if (rawNumber.startsWith('+44')) {
        data.countryCode = '+44';
        data.phone = rawNumber.slice(3);
      } else if (rawNumber.length === 10) {
        data.countryCode = '+91';
        data.phone = rawNumber;
      } else {
        data.phone = rawNumber.slice(-10);
      }
    }

    // 3. Candidate Name
    // Usually located in the first 1-5 lines of the resume before contact info and headings
    const ignoreNameWords = [
      'resume', 'curriculum vitae', 'cv', 'profile', 'summary', 'contact', 'address',
      'email', 'phone', 'mobile', 'github', 'linkedin', 'objective', 'page 1', 'career'
    ];

    for (let i = 0; i < Math.min(lines.length, 6); i++) {
      const line = lines[i];
      const lower = line.toLowerCase();
      const hasIgnoreWord = ignoreNameWords.some(w => lower.includes(w));
      const hasEmailOrUrl = lower.includes('@') || lower.includes('http') || lower.includes('.com');

      if (!hasIgnoreWord && !hasEmailOrUrl && line.length >= 3 && line.length <= 40) {
        // Name usually has 2-4 words consisting of alphabets and optional dots
        const words = line.split(/\s+/);
        if (words.length >= 2 && words.length <= 4 && /^[A-Za-z\s.]+$/.test(line)) {
          // Capitalize properly
          data.name = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          break;
        }
      }
    }

    // 4. Position Applied (matches against dropdown options)
    const positionMap = [
      { role: 'Full Stack Developer', pattern: /\b(full\s*stack|mern|mean|node(?:\.js)?\s*\+\s*react)\b/i },
      { role: 'Frontend Developer', pattern: /\b(frontend|front-end|front\s*end|react(?:\.js)?\s*dev|angular|vue|web\s*developer)\b/i },
      { role: 'Backend Developer', pattern: /\b(backend|back-end|back\s*end|node(?:\.js)?\s*dev|python\s*dev|django|flask|fastapi|php\s*dev|laravel)\b/i },
      { role: 'Mobile App Developer', pattern: /\b(mobile\s*app|flutter|react\s*native|android(?:\s*app|\s*dev)|ios(?:\s*app|\s*dev)|swift|kotlin)\b/i },
      { role: 'UI/UX Designer', pattern: /\b(ui[\s/]*ux|ux[\s/]*ui|ui\s*designer|ux\s*designer|figma|product\s*designer)\b/i },
      { role: 'QA Engineer', pattern: /\b(qa\s*engineer|quality\s*assurance|software\s*tester|automation\s*test|selenium|manual\s*test)\b/i },
      { role: 'DevOps Engineer', pattern: /\b(devops|cloud\s*engineer|aws\s*engineer|docker|kubernetes|ci\/cd|sre)\b/i },
      { role: 'Project Manager', pattern: /\b(project\s*manager|product\s*manager|scrum\s*master|technical\s*lead|tech\s*lead)\b/i },
      { role: 'Digital Marketing Specialist', pattern: /\b(digital\s*marketing|seo\s*specialist|sem\s*specialist|content\s*marketer)\b/i }
    ];

    for (const item of positionMap) {
      if (item.pattern.test(text)) {
        data.position = item.role;
        break;
      }
    }

    // 5. Total Experience (Years and Months)
    const expRegex1 = /(?:total\s*(?:work)?\s*experience|experience)[:\s]*([0-9]+(?:\.[0-9]+)?)\s*(?:\+)?\s*(?:years?|yrs?)(?:\s*(?:and)?\s*([0-9]+)\s*(?:months?|mos?))?/i;
    const expRegex2 = /\b([0-9]+(?:\.[0-9]+)?)\s*(?:\+)?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:experience|exp)\b/i;

    const m1 = text.match(expRegex1);
    const m2 = text.match(expRegex2);

    if (m1) {
      const yrs = parseFloat(m1[1]);
      data.expYears = Math.min(10, Math.floor(yrs)).toString();
      data.expMonths = m1[2] ? Math.min(11, parseInt(m1[2], 10)).toString() : '0';
    } else if (m2) {
      const yrs = parseFloat(m2[1]);
      data.expYears = Math.min(10, Math.floor(yrs)).toString();
      data.expMonths = '0';
    } else {
      // Check for fresher / student keywords
      if (/\b(fresher|entry[\s-]level|recent\s*graduate|student)\b/i.test(text)) {
        data.expYears = '0';
        data.expMonths = '0';
      }
    }

    // 6. Highest Qualification
    const degreeRegex = /\b(B\.?Tech|B\.?E\.?|M\.?Tech|M\.?E\.?|M\.?C\.?A\.?|B\.?C\.?A\.?|B\.?Sc|M\.?Sc|M\.?B\.?A\.?|B\.?Com|B\.?B\.?A\.?|Bachelor\s*of\s*Technology|Bachelor\s*of\s*Engineering|Master\s*of\s*Computer\s*Applications|Bachelor\s*of\s*Computer\s*Applications)\b/i;
    const streamRegex = /\b(Computer\s*Science(?:\s*(?:and|&)\s*Engineering)?|Information\s*Technology|Electronics(?:\s*(?:and|&)\s*Communication)?|ECE|EEE|Mechanical|Civil|Data\s*Science|Artificial\s*Intelligence|Software\s*Engineering)\b/i;

    const degreeMatch = text.match(degreeRegex);
    const streamMatch = text.match(streamRegex);

    if (degreeMatch) {
      const deg = degreeMatch[0].replace(/\./g, '').toUpperCase();
      const strm = streamMatch ? ` - ${streamMatch[0]}` : '';
      data.qualification = `${deg}${strm}`;
    }

    // 7. Key Skills (Matches against a curated skills catalogue)
    const skillsCatalog = [
      'React.js', 'React', 'Next.js', 'Node.js', 'Express.js', 'Express',
      'JavaScript', 'TypeScript', 'Python', 'Django', 'Flask', 'FastAPI',
      'HTML5', 'HTML', 'CSS3', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Sass',
      'Redux', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQL', 'Redis',
      'Git', 'GitHub', 'REST APIs', 'REST API', 'GraphQL',
      'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Linux',
      'Figma', 'UI/UX', 'Flutter', 'React Native', 'Android', 'iOS',
      'Swift', 'Kotlin', 'Java', 'Spring Boot', 'PHP', 'Laravel',
      'WordPress', 'C++', 'C#', '.NET', 'Jest', 'Selenium', 'Postman', 'Firebase'
    ];

    const matchedSkills = new Set();
    skillsCatalog.forEach(skill => {
      // Escape for regex
      const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const reg = new RegExp(`\\b${escaped}\\b`, 'i');
      if (reg.test(text)) {
        matchedSkills.add(skill);
      }
    });

    if (matchedSkills.size > 0) {
      // Pick top matched skills (up to 8)
      data.skills = Array.from(matchedSkills).slice(0, 10).join(', ');
    }

    // 8. Current Designation
    const desigMatch = text.match(/\b(Senior\s+Software\s+Engineer|Software\s+Engineer|Full\s+Stack\s+Developer|Frontend\s+Developer|Backend\s+Developer|Mobile\s+Developer|UI\/UX\s+Designer|QA\s+Engineer|Associate\s+Software\s+Engineer|Junior\s+Software\s+Engineer|Software\s+Developer|Web\s+Developer|Intern|Tech\s+Lead)\b/i);
    if (desigMatch) {
      data.designation = desigMatch[0].trim();
    }

    // 9. Location Detection
    const cityMatch = text.match(/\b(Madurai|Chennai|Coimbatore|Bangalore|Bengaluru|Hyderabad|Kochi|Trivandrum|Pune|Mumbai|Delhi|Noida|Gurgaon|Trichy|Salem)\b/i);
    if (cityMatch) {
      const city = cityMatch[0].trim();
      data.currentLocation = city;
      if (['Madurai', 'Chennai'].includes(city)) {
        data.preferredLocation = `${city}, Tamil Nadu`;
      }
    }

    // 10. Gender / Sex detection
    const genderMatch = text.match(/\b(?:Gender|Sex)\s*[:\-]?\s*(Male|Female)\b/i);
    if (genderMatch) {
      data.gender = genderMatch[1].charAt(0).toUpperCase() + genderMatch[1].slice(1).toLowerCase();
    }

    return data;
  }

  /**
   * Apply parsed data to form inputs and highlight fields
   */
  function applyParsedData(parsed) {
    if (!parsed) return;
    let fieldsPopulated = 0;

    function populateInput(id, value) {
      const el = document.getElementById(id);
      if (el && value) {
        el.value = value;
        el.classList.add('auto-filled-glow');
        setTimeout(() => el.classList.remove('auto-filled-glow'), 2500);
        fieldsPopulated++;
      }
    }

    if (parsed.name) populateInput('applicantName', parsed.name);
    if (parsed.email) populateInput('applicantEmail', parsed.email);
    if (parsed.phone) populateInput('applicantPhone', parsed.phone);
    if (parsed.countryCode) {
      const countrySelect = document.getElementById('countryCode');
      if (countrySelect) countrySelect.value = parsed.countryCode;
    }

    if (parsed.position) {
      const posSelect = document.getElementById('positionApplied');
      if (posSelect) {
        for (let i = 0; i < posSelect.options.length; i++) {
          if (posSelect.options[i].value === parsed.position) {
            posSelect.selectedIndex = i;
            posSelect.classList.add('auto-filled-glow');
            setTimeout(() => posSelect.classList.remove('auto-filled-glow'), 2500);
            fieldsPopulated++;
            break;
          }
        }
      }
    }

    if (parsed.expYears !== undefined) {
      const expY = document.getElementById('expYears');
      if (expY) {
        expY.value = parsed.expYears;
        expY.classList.add('auto-filled-glow');
        setTimeout(() => expY.classList.remove('auto-filled-glow'), 2500);
      }
    }

    if (parsed.expMonths !== undefined) {
      const expM = document.getElementById('expMonths');
      if (expM) {
        expM.value = parsed.expMonths;
        expM.classList.add('auto-filled-glow');
        setTimeout(() => expM.classList.remove('auto-filled-glow'), 2500);
      }
    }

    if (parsed.currentLocation) populateInput('currentLocation', parsed.currentLocation);

    // Show auto-fill success message banner if any fields were auto-populated
    if (fieldsPopulated > 0 && autofillAlert) {
      autofillAlert.style.display = 'flex';
      setTimeout(() => {
        autofillAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  // =========================================================================
  // Resume File Selection & Drag & Drop Handling
  // =========================================================================

  async function handleFile(file) {
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      alert('Please upload a valid resume file in PDF, DOC, or DOCX format.');
      clearFile();
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('The uploaded file exceeds the 5MB size limit. Please upload a smaller file.');
      clearFile();
      return;
    }

    selectedFile = file;
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = formatFileSize(file.size);

    fileCard.style.display = 'flex';
    fileZone.style.display = 'none';

    // Clear validation error on resume upload
    const resumeGroup = document.getElementById('resumeGroup');
    if (resumeGroup) resumeGroup.classList.remove('has-error');

    // Show Scanning State
    if (parsingIndicator) parsingIndicator.style.display = 'flex';
    if (autofillAlert) autofillAlert.style.display = 'none';

    try {
      // Pure client-side parsing in browser memory
      const rawText = await extractTextFromFile(file);
      console.log('Resume text extracted successfully. Length:', rawText.length);

      const parsedData = parseResumeContent(rawText);
      console.log('Parsed candidate profile:', parsedData);

      // Hide scanning state
      if (parsingIndicator) parsingIndicator.style.display = 'none';

      // Apply auto-fill data to form fields
      if (parsedData) {
        applyParsedData(parsedData);
      }
    } catch (err) {
      console.error('Client-side resume parsing error:', err);
      if (parsingIndicator) parsingIndicator.style.display = 'none';
      // Non-blocking: Candidate can still fill manually
    }
  }

  function clearFile() {
    selectedFile = null;
    fileInput.value = '';
    fileCard.style.display = 'none';
    fileZone.style.display = 'block';
    if (parsingIndicator) parsingIndicator.style.display = 'none';
    if (autofillAlert) autofillAlert.style.display = 'none';
  }

  // File Input Change
  fileInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  // Remove File Click
  removeFileBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearFile();
  });

  // Drag and Drop Events
  ['dragenter', 'dragover'].forEach(eventName => {
    fileZone.addEventListener(eventName, function (e) {
      e.preventDefault();
      e.stopPropagation();
      fileZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    fileZone.addEventListener(eventName, function (e) {
      e.preventDefault();
      e.stopPropagation();
      fileZone.classList.remove('dragover');
    });
  });

  fileZone.addEventListener('drop', function (e) {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files[0]) {
      handleFile(dt.files[0]);
    }
  });

  // =========================================================================
  // Form Validation & Submission via Python SMTP Backend
  // =========================================================================

  function validateField(groupId, isValid) {
    const group = document.getElementById(groupId);
    if (!group) return isValid;
    if (!isValid) {
      group.classList.add('has-error');
    } else {
      group.classList.remove('has-error');
    }
    return isValid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isFormValid = true;

    // 0. Resume File (Must be attached)
    if (!validateField('resumeGroup', selectedFile !== null)) isFormValid = false;

    // 1. Name
    const nameInput = document.getElementById('applicantName');
    const nameVal = nameInput.value.trim();
    if (!validateField('nameGroup', nameVal.length >= 2)) isFormValid = false;

    // 2. Email
    const emailInput = document.getElementById('applicantEmail');
    const emailVal = emailInput.value.trim();
    if (!validateField('emailGroup', isValidEmail(emailVal))) isFormValid = false;

    // 3. Phone
    const phoneInput = document.getElementById('applicantPhone');
    const countryCodeSelect = document.getElementById('countryCode');
    const phoneVal = phoneInput.value.trim();
    const fullPhone = `${countryCodeSelect.value} ${phoneVal}`;
    if (!validateField('phoneGroup', phoneVal.length >= 7)) isFormValid = false;

    // 4. Position
    const positionSelect = document.getElementById('positionApplied');
    const positionVal = positionSelect.value;
    if (!validateField('positionGroup', positionVal !== '')) isFormValid = false;

    // 5. Experience
    const expYearsSelect = document.getElementById('expYears');
    const expMonthsSelect = document.getElementById('expMonths');
    const expYearsVal = expYearsSelect.value;
    const expMonthsVal = expMonthsSelect.value;
    const isExpValid = expYearsVal !== '' && expMonthsVal !== '';
    if (!validateField('experienceGroup', isExpValid)) isFormValid = false;

    // 6. Current Location
    const curLocInput = document.getElementById('currentLocation');
    const curLocVal = curLocInput ? curLocInput.value.trim() : '—';

    if (!isFormValid) {
      const firstError = document.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Set Loading State
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Submitting Application...';

    // Construct Multipart FormData for backend submission
    const formData = new FormData();
    formData.append('name', nameVal);
    formData.append('email', emailVal);
    formData.append('phone', fullPhone);
    formData.append('position', positionVal);
    formData.append('experience', `${expYearsVal} Years, ${expMonthsVal} Months`);
    formData.append('current_location', curLocVal || '—');
    formData.append('location', curLocVal || 'Not specified');
    formData.append('source', 'Career Page');
    formData.append('gender', 'Not specified');
    formData.append('qualification', '—');
    formData.append('skills', '—');
    formData.append('designation', '—');

    if (selectedFile) {
      formData.append('resume', selectedFile, selectedFile.name);
    }

    // Determine Backend API Endpoint
    const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
    const apiUrl = isLocal ? 'http://127.0.0.1:8002/api/career-apply/' : '/api/career-apply/';

    console.log('Sending application to Python SMTP endpoint:', apiUrl);

    fetch(apiUrl, {
      method: 'POST',
      body: formData
    })
      .then(async response => {
        let responseData = {};
        try {
          responseData = await response.json();
        } catch (e) {
          // Non-JSON response
        }

        if (!response.ok) {
          throw new Error(responseData.message || `Server responded with status ${response.status}`);
        }

        // Successfully sent via Python SMTP! Redirect to Thank You page
        window.location.href = '/successfully-submitted/';
      })
      .catch(error => {
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        btnText.textContent = 'Send';
        console.error('Career Application Submission Error:', error);

        let errorMsg = 'Failed to submit application. ';
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMsg += 'Could not connect to the backend server. Please make sure the server is running on port 8002 or contact hr@coderegimetechnologies.com directly.';
        } else {
          errorMsg += error.message;
        }

        alert(errorMsg);
      });
  });
});

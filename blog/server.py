from flask import Flask, request, abort, make_response, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import re
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# Load environment variables from .env
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
# Enable CORS for API routes from any origin (local or production domain)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# SMTP Email Configuration
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'sales.coderegime@gmail.com')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', 'clppnpbkyijbxugm')
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() in ('true', '1', 't')

ADMIN_EMAILS = [e.strip() for e in os.getenv('ADMIN_EMAIL', 'sales.coderegime@gmail.com,nandhu.coderegime@gmail.com').split(',') if e.strip()]
HR_EMAILS = [e.strip() for e in os.getenv('HR_EMAIL', 'hr@coderegimetechnologies.com,sales.coderegime@gmail.com,nandhu.coderegime@gmail.com').split(',') if e.strip()]

# The URL of your WordPress API (WordPress.com v1 API)
WP_API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/coderegimeblog.wordpress.com/posts/slug:"

def strip_html_tags(text):
    """Remove html tags from a string"""
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text).strip()

def get_featured_image(post):
    """Extract featured image from WordPress v1 post data"""
    if post.get('featured_image'):
        return post['featured_image']
    return 'https://www.coderegimetechnologies.com/images/color-logo.png'

def send_smtp_email(to_addrs, subject, html_body, text_body=None, reply_to=None, attachment_data=None, attachment_filename=None):
    """
    Sends an email using configured SMTP credentials with support for HTML, text fallback, and file attachments.
    """
    if isinstance(to_addrs, str):
        to_addrs = [to_addrs]
    
    msg = MIMEMultipart('mixed')
    msg['From'] = f"Code Regime <{EMAIL_HOST_USER}>"
    msg['To'] = ", ".join(to_addrs)
    msg['Subject'] = subject
    if reply_to:
        msg['Reply-To'] = reply_to

    # Alternative part for Text + HTML
    msg_body = MIMEMultipart('alternative')
    if text_body:
        msg_body.attach(MIMEText(text_body, 'plain', 'utf-8'))
    if html_body:
        msg_body.attach(MIMEText(html_body, 'html', 'utf-8'))
    msg.attach(msg_body)

    # Attach file if provided
    if attachment_data and attachment_filename:
        try:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment_data)
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename="{attachment_filename}"')
            msg.attach(part)
        except Exception as e:
            print(f"[SMTP Warning] Failed to attach file {attachment_filename}: {e}")

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=25)
        if EMAIL_USE_TLS:
            server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, to_addrs, msg.as_string())
        server.quit()
        return True, "Email sent successfully"
    except Exception as e:
        print(f"[SMTP Error] Failed to send email to {to_addrs}: {e}")
        return False, str(e)


# =========================================================================
# API Endpoints
# =========================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Code Regime Website & SMTP API",
        "smtp_configured": bool(EMAIL_HOST_USER and EMAIL_HOST_PASSWORD)
    }), 200

@app.route('/api/career-apply', methods=['POST'])
def career_apply():
    """
    Handles career job application submissions with resume file attachment.
    Dispatches:
      1. Internal notification to HR & Admin with candidate details and resume file.
      2. Professional confirmation email to applicant.
    """
    try:
        # Form field extraction
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        position = request.form.get('position', '').strip()
        location = request.form.get('location', 'Not specified').strip()
        source = request.form.get('source', 'Not specified').strip()
        gender = request.form.get('gender', 'Not specified').strip()
        experience = request.form.get('experience', 'Not specified').strip()
        qualification = request.form.get('qualification', 'Not specified').strip()
        skills = request.form.get('skills', 'Not specified').strip()
        designation = request.form.get('designation', '—').strip()
        current_location = request.form.get('current_location', '—').strip()

        if not name or not email or not position:
            return jsonify({"success": False, "message": "Missing required fields (Name, Email, or Position)."}), 400

        # Handle resume file attachment
        attachment_data = None
        attachment_filename = None
        resume_file = request.files.get('resume')
        if resume_file and resume_file.filename:
            attachment_filename = resume_file.filename
            attachment_data = resume_file.read()

        # 1. Build Internal HR Notification Email
        hr_subject = f"New Job Application: {position} - {name}"
        hr_html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #2d3748; }}
    .container {{ max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }}
    .header {{ background: #1a202c; color: #ffffff; padding: 24px 30px; border-bottom: 4px solid #00ab15; }}
    .header h2 {{ margin: 0; font-size: 20px; font-weight: 700; }}
    .header p {{ margin: 6px 0 0; font-size: 14px; color: #a0aec0; }}
    .content {{ padding: 30px; }}
    .table {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
    .table td {{ padding: 12px 14px; border-bottom: 1px solid #edf2f7; font-size: 14px; vertical-align: top; }}
    .table td.label {{ font-weight: 600; color: #4a5568; width: 35%; background: #f8fafc; }}
    .table td.value {{ color: #1a202c; }}
    .badge {{ display: inline-block; background: #e6fffa; color: #234e52; font-weight: 600; padding: 4px 10px; border-radius: 4px; font-size: 13px; }}
    .footer {{ background: #f8fafc; padding: 18px 30px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #edf2f7; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Job Application Received</h2>
      <p>Position: <strong>{position}</strong></p>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0;">A new candidate has submitted an application through the Code Regime Careers page.</p>
      
      <table class="table">
        <tr>
          <td class="label">Applicant Name</td>
          <td class="value"><strong>{name}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:{email}" style="color: #00ab15; text-decoration: none; font-weight: 600;">{email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value">{phone}</td>
        </tr>
        <tr>
          <td class="label">Position Applied</td>
          <td class="value"><span class="badge">{position}</span></td>
        </tr>
        <tr>
          <td class="label">Total Experience</td>
          <td class="value">{experience}</td>
        </tr>
        <tr>
          <td class="label">Current Location</td>
          <td class="value">{current_location}</td>
        </tr>
        <tr>
          <td class="label">Attached Resume</td>
          <td class="value"><strong>{attachment_filename if attachment_filename else 'No file attached'}</strong></td>
        </tr>
      </table>
    </div>
    <div class="footer">
      Code Regime Technologies • Careers & Hiring Portal
    </div>
  </div>
</body>
</html>
        """

        hr_text = f"""
New Job Application Received:
-----------------------------
Applicant Name: {name}
Email: {email}
Phone: {phone}
Position Applied: {position}
Total Experience: {experience}
Current Location: {current_location}
Resume Attached: {attachment_filename or 'None'}
        """

        # Dispatch Internal Email to HR & Admins with attached resume
        hr_success, hr_msg = send_smtp_email(
            to_addrs=HR_EMAILS,
            subject=hr_subject,
            html_body=hr_html,
            text_body=hr_text,
            reply_to=email,
            attachment_data=attachment_data,
            attachment_filename=attachment_filename
        )

        if not hr_success:
            print(f"[Career Apply Error] Failed to send HR notification: {hr_msg}")
            return jsonify({"success": False, "message": f"Failed to dispatch application: {hr_msg}"}), 500

        # 2. Dispatch Candidate Auto-Reply Confirmation Email
        candidate_subject = f"Application Received: {position} - Code Regime Technologies"
        candidate_html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7fafc; margin: 0; padding: 20px; color: #2d3748; line-height: 1.6; }}
    .card {{ max-width: 600px; background: #ffffff; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }}
    .header {{ background: #1a202c; color: #ffffff; padding: 25px 30px; text-align: center; border-bottom: 4px solid #00ab15; }}
    .header h2 {{ margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }}
    .header p {{ margin: 6px 0 0; font-size: 14px; color: #cbd5e0; }}
    .body {{ padding: 30px; font-size: 15px; color: #4a5568; }}
    .details-box {{ background: #f8fafc; border-left: 4px solid #00ab15; padding: 14px 18px; margin: 20px 0; border-radius: 0 6px 6px 0; }}
    .details-box p {{ margin: 4px 0; font-size: 14px; color: #2d3748; }}
    .footer {{ background: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Application Received</h2>
      <p>Code Regime Technologies Recruitment Team</p>
    </div>
    <div class="body">
      <p>Dear <strong>{name}</strong>,</p>
      
      <p>Thank you for your interest in joining <strong>Code Regime Technologies</strong>! We have successfully received your application for the following role:</p>
      
      <div class="details-box">
        <p><strong>Position Applied:</strong> {position}</p>
        <p><strong>Location:</strong> {current_location}</p>
        <p><strong>Total Experience:</strong> {experience}</p>
      </div>
      
      <p>Our Human Resources and Technical Hiring teams are currently reviewing candidate profiles against our role requirements. If your profile matches our criteria, one of our recruiters will reach out to you directly via phone or email for the initial discussion.</p>
      
      <p>In the meantime, feel free to explore our work and company culture at <a href="https://www.coderegimetechnologies.com" style="color: #00ab15; text-decoration: none; font-weight: 600;">coderegimetechnologies.com</a>.</p>
      
      <p style="margin-top: 25px;">Warm regards,<br><strong>Talent Acquisition Team</strong><br>Code Regime Technologies<br><a href="mailto:hr@coderegimetechnologies.com" style="color: #00ab15; text-decoration: none;">hr@coderegimetechnologies.com</a></p>
    </div>
    <div class="footer">
      © {os.getenv('YEAR', '2026')} Code Regime Technologies. All rights reserved.<br>
      Madurai • Coimbatore • Chennai, India
    </div>
  </div>
</body>
</html>
        """

        candidate_text = f"""
Dear {name},

Thank you for applying for the {position} role at Code Regime Technologies!

We have successfully received your application. Our Talent Acquisition team is reviewing your profile and will get in touch if your experience matches our requirements.

Warm regards,
Talent Acquisition Team
Code Regime Technologies
hr@coderegimetechnologies.com
https://www.coderegimetechnologies.com
        """

        # Dispatch candidate auto-reply (logged, but won't fail the response if candidate email has bounce)
        try:
            send_smtp_email(
                to_addrs=email,
                subject=candidate_subject,
                html_body=candidate_html,
                text_body=candidate_text,
                reply_to="hr@coderegimetechnologies.com"
            )
        except Exception as err:
            print(f"[Candidate Confirmation Warning] Could not send to candidate {email}: {err}")

        return jsonify({
            "success": True,
            "message": "Application submitted successfully! Our team will contact you soon."
        }), 200

    except Exception as e:
        print(f"[Career Apply Exception] {e}")
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500


@app.route('/api/send-inquiry', methods=['POST'])
def send_inquiry():
    """
    Handles general contact inquiries from modal forms and contact-us pages.
    """
    try:
        data = request.get_json(silent=True) or request.form.to_dict() or {}
        name = data.get('name') or data.get('fname') or 'Website Visitor'
        email = data.get('email', '').strip()
        phone = data.get('phone', '—').strip()
        service = data.get('service') or data.get('subject') or 'General Inquiry'
        message = data.get('message', '').strip()

        if not email:
            return jsonify({"success": False, "message": "Email is required."}), 400

        admin_subject = f"New Website Inquiry: {service} from {name}"
        admin_html = f"""
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background: #1a202c; color: #fff; padding: 18px 24px; border-bottom: 4px solid #00ab15;">
      <h3 style="margin: 0;">New Website Inquiry</h3>
    </div>
    <div style="padding: 24px;">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Service / Subject:</strong> {service}</p>
      <div style="background: #f8fafc; padding: 14px; border-radius: 6px; margin-top: 15px;">
        <strong>Message:</strong><br>
        <p style="white-space: pre-line; margin: 6px 0 0;">{message}</p>
      </div>
    </div>
  </div>
</body>
</html>
        """

        send_smtp_email(
            to_addrs=ADMIN_EMAILS,
            subject=admin_subject,
            html_body=admin_html,
            text_body=f"Name: {name}\nEmail: {email}\nPhone: {phone}\nService: {service}\nMessage: {message}",
            reply_to=email
        )

        return jsonify({"success": True, "message": "Inquiry sent successfully"}), 200

    except Exception as e:
        print(f"[Inquiry Error] {e}")
        return jsonify({"success": False, "message": str(e)}), 500


# =========================================================================
# Blog Post Serving (Preserved Existing Implementation)
# =========================================================================

@app.route('/blog/<slug>')
def serve_blog_post(slug):
    post = None
    # 1. Fetch the post from WordPress
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        response = requests.get(f"{WP_API_URL}{slug}", headers=headers, timeout=5)
        response.raise_for_status()
        data = response.json()
        if 'error' not in data:
            post = data
    except Exception as e:
        print(f"Error fetching post {slug}: {e}")

    # 2. Extract SEO data
    if post:
        title = post.get('title', 'Code Regime Blog Post')
        title = title.replace('&#8211;', '-').replace('&#8217;', "'").replace('&amp;', '&')
        
        excerpt = post.get('excerpt', 'Insights on software development and technology.')
        description = strip_html_tags(excerpt)
            
        image = get_featured_image(post)
        content = post.get('content', '')
        
        keywords = "Code Regime, blog, software development"
        if 'tags' in post and post['tags']:
            tags_dict = post['tags']
            tags_list = [tags_dict[k].get('name', '') for k in tags_dict.keys() if tags_dict[k].get('name')]
            if tags_list:
                keywords = ", ".join(tags_list)
    else:
        # Fallback values if post not found
        title = "Code Regime Blog - Tech Insights & Dev Updates"
        description = "Explore expert articles on mobile app development, web apps, SaaS, AI tools, and clone scripts. Stay updated with Code Regime Technologies' blog page."
        keywords = "Code Regime, blog, software development"
        image = "https://www.coderegimetechnologies.com/images/color-logo.png"
        content = "<p>Loading content...</p>"

    # 3. Read the post.html template
    template_path = os.path.join(os.path.dirname(__file__), 'post.html')
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except FileNotFoundError:
        return "Template not found", 500

    # 4. Inject SEO tags
    current_url = f"https://www.coderegimetechnologies.com/blog/{slug}"
    
    html = html.replace('{{SEO_TITLE}}', title)
    html = html.replace('{{SEO_DESC}}', description)
    html = html.replace('{{SEO_KEYWORDS}}', keywords)
    html = html.replace('{{SEO_IMAGE}}', image)
    html = html.replace('{{SEO_URL}}', current_url)
    html = html.replace('{{POST_TITLE}}', title)
    html = html.replace('{{POST_IMAGE}}', image)
    html = html.replace('{{POST_CONTENT}}', content)

    # 5. Return the modified HTML with a 404 status code if the post was not found
    if not post:
        return html, 404
        
    return html

if __name__ == '__main__':
    # Run on port 8002 so it doesn't conflict with your Django app on 8001
    print("Starting Code Regime Blog & SMTP Email API server on http://127.0.0.1:8002 ...")
    app.run(host='127.0.0.1', port=8002)

document.addEventListener("DOMContentLoaded", function () {
  // ─────────────────────────────────────────────
  // Centralized Footer Loader
  // ─────────────────────────────────────────────
  /* CANONICAL_FOOTER_START */
  const canonicalFooterHTML = `<footer class="cr-footer">
  <div class="cr-footer__inner">

    <!-- TOP GRID -->
    <div class="cr-footer__grid">

      <!-- Column 1: Brand -->
      <div class="cr-footer__col">
        <h3>Code Regime</h3>
        <p class="cr-footer__desc">
          Code Regime Technologies is a leading software development company and Clone Script Development Company, delivering innovative web, mobile, and enterprise solutions, as well as a ready-made clone script product. We help businesses grow with scalable technology, custom applications, and reliable digital transformation services.
        </p>
        <div class="cr-footer__social-icons">
          <a href="https://www.linkedin.com/company/coderegime/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <img src="/images/linkedin.png" alt="LinkedIn Icon" width="24" height="24">
          </a>
          <a href="https://x.com/RegimeCode" target="_blank" rel="noopener" aria-label="Twitter / X">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/coderegimetechnologies/" target="_blank" rel="noopener"
            aria-label="Instagram">
            <img src="/images/instagram.png" alt="Instagram Icon" width="24" height="24">
          </a>
          <a href="https://www.facebook.com/Coderegimetech/" target="_blank" rel="noopener" aria-label="Facebook">
            <img src="/images/facebook.png" alt="Facebook Icon" width="24" height="24">
          </a>
          <a href="https://www.threads.net/@coderegimetechnologies" target="_blank" rel="noopener" aria-label="Threads">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.785-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.74-1.8-.365-.468-.702-.84-1.685-.84-1.201 0-2.07.24-2.595.717-.35.318-.537.727-.612 1.157l-1.968-.35c.186-1.018.714-1.86 1.517-2.528C8.976 5.073 10.205 4.81 11.618 4.81c.6 0 1.118.058 1.621.18.914.22 1.629.544 2.157 1.008.914.805 1.405 1.868 1.405 3.177 0 .5-.043.998-.129 1.487.85.513 1.511 1.201 1.9 2.016.543 1.14.465 2.715-.263 4.13-1.094 2.132-3.344 3.174-6.895 3.194z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@CodeRegime" target="_blank" rel="noopener" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M9.996,15.005l0-6.01L15.224,12L9.996,15.005z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Useful Links -->
      <div class="cr-footer__col">
        <h3>Useful Links</h3>
        <ul class="cr-footer__list">
          <li><a href="/about-us/">About Us</a></li>
          <li><a href="/Portfolio/">Portfolio</a></li>
          <li><a href="/careers/">Careers</a></li>
          <li><a href="/contact-us/">Contact Us</a></li>
        </ul>
      </div>



      <!-- Column 4: Products -->
      <div class="cr-footer__col">
        <h3>Products</h3>
        <ul class="cr-footer__list">
          <li><a href="/uber-clone/">CabRegime - Uber Clone</a></li>
          <li><a href="/ubereats-clone/">FoodRegime - Ubereats clone</a></li>
          <li><a href="/uber-for-handyman-app/">HandymanRegime - Uber for Handman</a></li>
          <li><a href="/fintech-app-development/">Fintech App</a></li>
          <li><a href="/flight-booking-app/">Flight Booking App</a></li>
        </ul>
      </div>

      <!-- Column 4.5: Careers -->
      <div class="cr-footer__col">
        <h3><a href="/careers/" style="color: inherit; text-decoration: none;">Careers</a></h3>
        <ul class="cr-footer__contact-list">
          <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>HR</strong>
              <a href="tel:+916374689453">+91 6374689453</a>
            </div>
          </li>
          <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>HR Mail</strong>
              <a href="mailto:hr@coderegimetechnologies.com" target="_blank"
                aria-label="hr@coderegimetechnologies.com"
                rel="noopener"><span>hr@coderegimetechnologies.com</span>
              </a>
            </div>
          </li>
          <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>Job Openings</strong>
              <a href="/careers/">Apply Now</a>
            </div>
          </li>
        </ul>
      </div>

      <!-- Column 5: Legal -->
      <div class="cr-footer__col">
        <h3>Legal</h3>
        <ul class="cr-footer__list">
          <li><a href="/privacy-policy/">Privacy Policy</a></li>
          <li><a href="/refund-policy/">Refund Policy</a></li>
          <li><a href="/security-policy/">Support</a></li>
          <li><a href="/disclaimer/">Disclaimer</a></li>
        </ul>
      </div>

      <!-- Column 6: Contact Us -->
      <div class="cr-footer__col">
        <h3>Get in touch</h3>
        <ul class="cr-footer__contact-list">
          <li>
            <div class="cr-footer__contact-icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div class="cr-footer__contact-text">
              <strong>WhatsApp</strong>
              <a href="https://wa.me/918072218602">+91 80722 18602</a>
            </div>
          </li>
          <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>Phone</strong>
              <a href="tel:+918072218602">+91 80722 18602</a>
            </div>
          </li>
                              <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>Corporate Address</strong>
              235 Beaverbrae Dr, Markham,<br>
              Ontario, L6C 3K6
            </div>
          </li>
          <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>Development Office</strong>
              74, 75 HDFC Bank Building,<br>
              2nd floor, Kamarajar Salai,<br>
              Madurai, Tamil Nadu – 625009
            </div>
          </li>
          <li>
            <div class="cr-footer__contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div class="cr-footer__contact-text">
              <strong>Business Enquiry</strong>
              <a href="mailto:sales@coderegimetechnologies.com" target="_blank"
                aria-label="sales@coderegimetechnologies.com"
                rel="noopener"><span>sales@coderegimetechnologies.com</span>
              </a>
            </div>
          </li>
        </ul>
      </div>

    </div><!-- /grid -->

    <hr class="cr-footer__divider">

    <!-- BOTTOM ROW -->
    <div class="cr-footer__bottom">
      <div class="cr-footer__disclaimer">
        <p class="cr-footer__disclaimer-title">Disclaimer</p>
        <p>The terms Uber, UberEats, Grubhub, DoorDash, and Foodora are used strictly for marketing and
          illustrative
          purposes. Code Regime Technologies is in no way affiliated with, endorsed by, or connected to
          any of the
          listed companies. We entirely own the custom source code and design of our products, and we
          do not use any
          of their proprietary intellectual property.</p>
      </div>
    </div><!-- /bottom -->
    <hr class="cr-footer__divider">
    <p class="cr-footer__copyright">
      © Copyright <span id="year"></span>, All Rights Reserved by Code Regime Technologies.
    </p>
  </div><!-- /inner -->
</footer>`;
  /* CANONICAL_FOOTER_END */

  const siteFooterPlaceholder = document.getElementById("site-footer") ||
    document.getElementById("cr-footer-placeholder") ||
    document.querySelector("site-footer");

  if (siteFooterPlaceholder) {
    siteFooterPlaceholder.outerHTML = canonicalFooterHTML;
  }

  // Inject SweetAlert2 dynamically with long-lived 1-year cache (pinned version)
  function ensureSwal(callback) {
    if (typeof Swal !== 'undefined') {
      if (callback) callback();
      return;
    }
    const swalScript = document.createElement('script');
    swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.all.min.js';
    if (callback) swalScript.onload = callback;
    document.head.appendChild(swalScript);
  }

  // Preload SweetAlert2 during idle time (without blocking critical rendering)
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => ensureSwal());
  } else {
    setTimeout(ensureSwal, 4000);
  }

  // Update copyright year
  document.querySelectorAll("#year, .footer-year").forEach(span => {
    span.textContent = new Date().getFullYear();
  });

  // Add Floating Social Bar
  const floatingBarHTML = `
        <style>
        .cr-floating-social {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 12px;
            z-index: 9999;
        }

        .cr-floating-social a {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 54px;
            height: 54px;
            border-radius: 27px 0 0 27px;
            color: #fff;
            text-decoration: none;
            font-size: 26px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            padding-left: 14px; /* Centers the icon in the 54px width */
            box-shadow: -2px 4px 15px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            white-space: nowrap;
        }
        
        .cr-floating-social a i {
            min-width: 26px; /* Ensure icon doesn't shrink */
            text-align: center;
        }

        .cr-floating-social a .social-text {
            font-family: 'Outfit', 'Segoe UI', sans-serif;
            font-size: 16px;
            font-weight: 600;
            margin-left: 12px;
            opacity: 0;
            transform: translateX(10px);
            transition: all 0.3s ease;
        }

        /* WhatsApp */
        .cr-floating-social a.whatsapp {
            background: linear-gradient(135deg, #25D366, #128C7E);
        }

        /* Telegram */
        .cr-floating-social a.telegram {
            background: linear-gradient(135deg, #0088cc, #00aaff);
        }

        /* Mail */
        .cr-floating-social a.mail {
            background: linear-gradient(135deg, #FF416C, #FF4B2B);
        }

        /* Calendly */
        .cr-floating-social a.calendly {
            background: linear-gradient(135deg, #006BFF, #0044CC);
        }

        /* Hover Expansion */
        .cr-floating-social a:hover {
            width: 155px; /* Default fallback */
        }
        
        .cr-floating-social a.whatsapp:hover {
            width: 160px;
        }

        .cr-floating-social a.telegram:hover {
            width: 150px;
        }

        .cr-floating-social a.mail:hover {
            width: 110px;
        }

        .cr-floating-social a.calendly:hover {
            width: 145px;
        }

        .cr-floating-social a:hover .social-text {
            opacity: 1;
            transform: translateX(0);
        }
        
        .cr-floating-social a.whatsapp:hover {
            box-shadow: -4px 8px 25px rgba(37, 211, 102, 0.4);
        }
        .cr-floating-social a.telegram:hover {
            box-shadow: -4px 8px 25px rgba(0, 136, 204, 0.4);
        }
        .cr-floating-social a.mail:hover {
            box-shadow: -4px 8px 25px rgba(255, 75, 43, 0.4);
        }
        .cr-floating-social a.calendly:hover {
            box-shadow: -4px 8px 25px rgba(0, 107, 255, 0.4);
        }

        @media (max-width: 768px) {
            .cr-floating-social a {
                width: 46px;
                height: 46px;
                font-size: 22px;
                padding-left: 12px;
            }
            .cr-floating-social a i {
                min-width: 22px;
            }
            .cr-floating-social a:hover {
                width: 140px;
            }
            .cr-floating-social a.whatsapp:hover {
                width: 140px;
            }
            .cr-floating-social a.telegram:hover {
                width: 135px;
            }
            .cr-floating-social a.mail:hover {
                width: 105px;
            }
            .cr-floating-social a.calendly:hover {
                width: 130px;
            }
        }
        </style>
        <div class="cr-floating-social">
            <a href="https://wa.me/918072218602" target="_blank" rel="noopener" class="whatsapp">
                <i class="fab fa-whatsapp"></i>
                <span class="social-text">WhatsApp</span>
            </a>
            <a href="https://t.me/+919944314416" target="_blank" rel="noopener" class="telegram">
                <i class="fab fa-telegram-plane"></i>
                <span class="social-text">Telegram</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@coderegimetechnologies.com" target="_blank" rel="noopener" class="mail">
                <i class="fas fa-envelope"></i>
                <span class="social-text">Mail</span>
            </a>
            <a href="https://calendly.com/" target="_blank" rel="noopener" class="calendly">
                <i class="far fa-calendar-alt"></i>
                <span class="social-text">Calendly</span>
            </a>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", floatingBarHTML);

  // Auto-show Contact Modal
  (function initContactModal() {
    if (typeof window.bootstrap === 'undefined') return;

    const contactModalHTML = `
    <div class="modal fade" id="contactPopup" tabindex="-1" aria-labelledby="contactPopupLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered cp-dialog">
        <div class="modal-content cp-content">
          <div class="modal-body cp-body">

            <!-- LEFT: Dark Showcase Panel -->
            <section class="cp-left">
              <div class="cp-left-bg-dots"></div>
              <div class="cp-left-orb cp-left-orb--top"></div>
              <div class="cp-left-orb cp-left-orb--bottom"></div>
              <div class="cp-left-inner">

                <!-- Testimonial Card (Auto-swiping every 3s) -->
                <article class="cp-testimonial" id="cpTestimonialCard">
                  <div class="cp-quote-icon"><i class="fas fa-quote-left"></i></div>
                  <div class="cp-testimonial-slider" id="cpTestimonialSlider">
                    <p class="cp-testimonial-text" id="cpTestiQuote">
                      From initial consultation to final deployment, Code Regime exceeded every expectation. Their team built us a robust, scalable application and provided hands-on support throughout the entire process. A truly world-class partner.
                    </p>
                    <div class="cp-testimonial-footer">
                      <div class="cp-testimonial-author">
                        <img src="/images/testimonial/testi-1.webp" alt="BLACKBEACON B.V." id="cpTestiAvatar" class="cp-avatar" width="38" height="38" loading="lazy">
                        <div>
                          <h4 class="cp-author-name" id="cpTestiName">BLACKBEACON B.V.</h4>
                          <p class="cp-author-role" id="cpTestiRole">Client</p>
                        </div>
                      </div>
                      <div class="cp-company-badge" id="cpTestiBadge">
                        <i class="fa-solid fa-cloud-bolt" id="cpTestiIcon"></i>
                        <span id="cpTestiCompany">Kemetic.app</span>
                      </div>
                    </div>
                  </div>
                </article>

                <!-- Carousel Dots (5 dots) -->
                <div class="cp-dots" id="cpTestiDots" aria-label="Testimonial navigation">
                  <span class="cp-dot cp-dot--active" data-index="0" role="button" aria-label="Slide 1"></span>
                  <span class="cp-dot" data-index="1" role="button" aria-label="Slide 2"></span>
                  <span class="cp-dot" data-index="2" role="button" aria-label="Slide 3"></span>
                  <span class="cp-dot" data-index="3" role="button" aria-label="Slide 4"></span>
                  <span class="cp-dot" data-index="4" role="button" aria-label="Slide 5"></span>
                </div>

                <!-- Metrics Grid -->
                <div class="cp-metrics">
                  <!-- Row 1: Happy Clients (Full-width banner) -->
                  <div class="cp-metric cp-metric--wide">
                    <div class="cp-metric-value">200<span class="cp-metric-plus">+</span></div>
                    <div class="cp-metric-label"><i class="fas fa-users"></i><span>Happy Clients</span></div>
                  </div>
                  <!-- Row 2: Projects in app development & Countries Served -->
                  <div class="cp-metric">
                    <div class="cp-metric-value">1200<span class="cp-metric-plus">+</span></div>
                    <div class="cp-metric-label"><i class="fas fa-layer-group"></i><span>Completed Projects</span></div>
                  </div>
                  <div class="cp-metric">
                    <div class="cp-metric-value">20<span class="cp-metric-plus">+</span></div>
                    <div class="cp-metric-label"><i class="fas fa-globe"></i><span>Countries Served</span></div>
                  </div>
                  <!-- Row 3: Expert Team Members & Years of Market Domination -->
                  <div class="cp-metric">
                    <div class="cp-metric-value">50<span class="cp-metric-plus">+</span></div>
                    <div class="cp-metric-label"><i class="fas fa-user-tie"></i><span>Expert Team Members</span></div>
                  </div>
                  <div class="cp-metric">
                    <div class="cp-metric-value">8<span class="cp-metric-plus">+</span></div>
                    <div class="cp-metric-label"><i class="fas fa-crown"></i><span>Years of Market Domination</span></div>
                  </div>
                </div>

                <!-- Direct Reach Contact Bar (Email, Phone & WhatsApp) -->
                <div class="cp-contact-bar">
                  <!-- Row 1: Email (Full-width single-line) -->
                  <div class="cp-contact-bar-item cp-contact-bar-item--full">
                    <span class="cp-contact-icon-circle"><i class="fas fa-envelope"></i></span>
                    <div class="cp-contact-info">
                      <span class="cp-contact-label">Send us an email</span>
                      <a href="mailto:sales@coderegimetechnologies.com" class="cp-contact-value">sales@coderegimetechnologies.com</a>
                    </div>
                  </div>

                  <div class="cp-contact-bar-divider-h"></div>

                  <!-- Row 2: Phone & WhatsApp Side-by-Side -->
                  <div class="cp-contact-bar-row">
                    <div class="cp-contact-bar-item">
                      <span class="cp-contact-icon-circle"><i class="fas fa-phone"></i></span>
                      <div class="cp-contact-info">
                        <span class="cp-contact-label">Contact Number</span>
                        <a href="tel:+918072218602" class="cp-contact-value cp-contact-value--bold">+91 80722 18602</a>
                      </div>
                    </div>
                    <div class="cp-contact-divider"></div>
                    <div class="cp-contact-bar-item">
                      <span class="cp-contact-icon-circle cp-contact-icon-circle--whatsapp"><i class="fab fa-whatsapp"></i></span>
                      <div class="cp-contact-info">
                        <span class="cp-contact-label">WhatsApp Us</span>
                        <a href="https://wa.me/918072218602" target="_blank" rel="noopener" class="cp-contact-value cp-contact-value--bold cp-contact-value--whatsapp">+91 80722 18602</a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Trust Badges -->
               <!-- <div class="cp-trust-badges">
                  <div class="cp-badge">
                    <div class="cp-badge-icon cp-badge-icon--blue">
                      <span class="cp-badge-top">AICPA</span>
                      <span class="cp-badge-bottom">SOC</span>
                    </div>
                    <div class="cp-badge-text">
                      <span class="cp-badge-title">AICPA SOC</span>
                      Certified Security
                    </div>
                  </div>
                  <div class="cp-badge">
                    <div class="cp-badge-icon cp-badge-icon--green">ISO</div>
                    <div class="cp-badge-text">
                      <span class="cp-badge-title">ISO 9001:2015</span>
                      Quality Assured
                    </div>
                  </div>
                </div> -->
              </div>
            </section>

            <!-- RIGHT: White Form Panel -->
            <section class="cp-right">
              <button type="button" class="cp-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-xmark"></i>
              </button>
              <div class="cp-right-inner">
                <div class="cp-form-header">
                  <h2 class="cp-heading" id="contactPopupLabel">Share Your Vision &amp; Get Instant Revert</h2>
                  <p class="cp-subtitle">Reach our experts anytime to avail upfront insights on project overview.</p>
                </div>
                <form class="cp-form">
                  <div class="cp-row">
                    <div class="cp-field">
                      <span class="cp-icon"><i class="far fa-user"></i></span>
                      <input type="text" id="name" placeholder="Full name" required>
                    </div>
                    <div class="cp-field">
                      <span class="cp-icon"><i class="far fa-building"></i></span>
                      <input type="text" id="company" placeholder="Company Name">
                    </div>
                  </div>
                  <div class="cp-field">
                    <span class="cp-icon"><i class="far fa-envelope"></i></span>
                    <input type="email" id="email" placeholder="example@youremail.com" required>
                  </div>
                  <div class="cp-field cp-field--phone">
                    <div class="cp-phone-prefix">
                      <svg class="cp-flag" viewBox="0 0 640 480" width="16" height="12"><path d="M0 0h640v160H0z" fill="#f93"/><path d="M0 160h640v160H0z" fill="#fff"/><path d="M0 320h640v160H0z" fill="#128807"/><circle cx="320" cy="240" r="40" fill="#008"/></svg>
                      <i class="fas fa-chevron-down cp-chevron"></i>
                      <span class="cp-code">+91</span>
                    </div>
                    <input type="tel" id="mobile" placeholder="Phone number">
                  </div>
                  <div class="cp-field cp-field--select">
                    <span class="cp-icon"><i class="fas fa-layer-group"></i></span>
                    <select id="service">
                      <option value="" disabled selected>Select Product / Service</option>
                      <option value="mobile-app">Mobile App Services</option>
                      <option value="web-app">Web App Services</option>
                      <option value="clone-scripts">Clone Scripts</option>
                      <option value="fintech">Fintech App Development</option>
                      <option value="ai-solutions">Custom AI Solutions</option>
                    </select>
                  </div>
                  <div class="cp-field cp-field--textarea">
                    <textarea id="requirements" rows="2" placeholder="How can we help you? Describe your requirements..."></textarea>
                  </div>
                  <button type="submit" class="cp-submit">
                    <span>Book Free Consultation</span>
                    <i class="fas fa-arrow-right"></i>
                  </button>
                </form>
              </div>
              <div class="cp-social">
                <a href="https://www.facebook.com/Coderegimetech/" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://x.com/RegimeCode" target="_blank" rel="noopener" aria-label="X / Twitter"><i class="fab fa-x-twitter"></i></a>
                <a href="https://www.instagram.com/coderegimetechnologies/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/company/coderegime/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://www.youtube.com/@CodeRegime" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>`;

    // Ensure the new modern modal is present; replace any stale legacy popup
    const existingPopup = document.getElementById("contactPopup");
    if (existingPopup) {
      if (!existingPopup.querySelector(".cp-content")) {
        existingPopup.remove();
        document.body.insertAdjacentHTML("beforeend", contactModalHTML);
      }
    } else {
      document.body.insertAdjacentHTML("beforeend", contactModalHTML);
    }

    // Auto-swipe Testimonials Carousel (3-second interval)
    (function initTestimonialCarousel() {
      const testimonials = [
        {
          quote: "From initial consultation to final deployment, Code Regime exceeded every expectation. Their team built us a robust, scalable application and provided hands-on support throughout the entire process. A truly world-class partner.",
          name: "BLACKBEACON B.V.",
          role: "Client",
          company: "Kemetic.app",
          avatar: "/images/testimonial/testi-1.webp",
          icon: "fa-solid fa-cloud-bolt"
        },
        {
          quote: "Working with Code Regime was a game-changer for our business. Their professionalism, attention to detail, and ability to deliver on tight deadlines made the entire experience seamless. We've seen measurable growth since launch.",
          name: "Rishu Rajput",
          role: "Founder",
          company: "ApniRide",
          avatar: "/images/testimonial/testi-2.webp",
          icon: "fa-solid fa-car"
        },
        {
          quote: "The level of technical expertise and creative thinking Code Regime brought to our project was outstanding. They transformed our vision into a polished product that our users love. Couldn't have asked for a better development partner.",
          name: "Sakthivadivelan G",
          role: "Founder",
          company: "Unicare",
          avatar: "/images/testimonial/testi-3.webp",
          icon: "fa-solid fa-heart-pulse"
        },
        {
          quote: "Code Regime's team is incredibly reliable and easy to collaborate with. They understood our requirements quickly, kept communication transparent, and delivered a solution that significantly improved our operational efficiency.",
          name: "Carlos Vargas",
          role: "Product Lead",
          company: "InCav",
          avatar: "/images/testimonial/testi-4.webp",
          icon: "fa-solid fa-shield-halved"
        },
        {
          quote: "Exceptional quality and dedication from start to finish. Code Regime didn't just build what we asked for — they proactively suggested improvements that made the final product far better than we originally envisioned.",
          name: "Brian",
          role: "Tech Director",
          company: "Well-check",
          avatar: "/images/testimonial/testi-5.webp",
          icon: "fa-solid fa-stethoscope"
        }
      ];

      const slider = document.getElementById("cpTestimonialSlider");
      const quoteEl = document.getElementById("cpTestiQuote");
      const avatarEl = document.getElementById("cpTestiAvatar");
      const nameEl = document.getElementById("cpTestiName");
      const roleEl = document.getElementById("cpTestiRole");
      const companyEl = document.getElementById("cpTestiCompany");
      const iconEl = document.getElementById("cpTestiIcon");
      const dotsContainer = document.getElementById("cpTestiDots");
      const card = document.getElementById("cpTestimonialCard");
      const modalEl = document.getElementById("contactPopup");

      if (!slider || !dotsContainer) return;

      const dots = dotsContainer.querySelectorAll(".cp-dot");
      let currentIndex = 0;
      let timer = null;

      function renderSlide(index) {
        const item = testimonials[index];
        if (!item) return;

        slider.style.opacity = '0';
        slider.style.transform = 'translateY(3px)';

        setTimeout(() => {
          if (quoteEl) quoteEl.textContent = item.quote;
          if (avatarEl) {
            avatarEl.src = item.avatar;
            avatarEl.alt = item.name;
          }
          if (nameEl) nameEl.textContent = item.name;
          if (roleEl) roleEl.textContent = item.role;
          if (companyEl) companyEl.textContent = item.company;
          if (iconEl) iconEl.className = item.icon;

          dots.forEach((dot, idx) => {
            if (idx === index) {
              dot.classList.add("cp-dot--active");
            } else {
              dot.classList.remove("cp-dot--active");
            }
          });

          slider.style.opacity = '1';
          slider.style.transform = 'translateY(0)';
        }, 180);
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderSlide(currentIndex);
      }

      function startTimer() {
        stopTimer();
        timer = setInterval(nextSlide, 3000);
      }

      function stopTimer() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const idx = parseInt(dot.getAttribute("data-index"), 10);
          if (!isNaN(idx) && idx !== currentIndex) {
            currentIndex = idx;
            renderSlide(currentIndex);
            startTimer();
          }
        });
      });

      if (card) {
        card.addEventListener("mouseenter", stopTimer);
        card.addEventListener("mouseleave", startTimer);
      }

      if (modalEl) {
        modalEl.addEventListener("hidden.bs.modal", stopTimer);
        modalEl.addEventListener("shown.bs.modal", startTimer);
      }

      startTimer();
    })();

    // Auto-show Contact Modal after 6.5 seconds (without sessionStorage check for now for testing)
    setTimeout(() => {
      const contactPopup = document.getElementById("contactPopup");
      console.log("Checking for contactPopup in footer.js:", contactPopup);

      if (contactPopup) {
        if (typeof window.bootstrap !== 'undefined') {
          const modal = new bootstrap.Modal(contactPopup);
          modal.show();
        }
      }
    }, 6500);

    // Form submission logic for the modal
    const contactPopupForm = document.querySelector("#contactPopup .cp-form");
    if (contactPopupForm) {
      contactPopupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fname = contactPopupForm.querySelector("#name") ? contactPopupForm.querySelector("#name").value.trim() : '';
        const email = contactPopupForm.querySelector("#email") ? contactPopupForm.querySelector("#email").value.trim() : '';
        const company = contactPopupForm.querySelector("#company") ? contactPopupForm.querySelector("#company").value.trim() : '';
        const phone = contactPopupForm.querySelector("#mobile") ? contactPopupForm.querySelector("#mobile").value.trim() : '';

        const serviceEl = contactPopupForm.querySelector("#service");
        const service = serviceEl && serviceEl.selectedIndex > 0 ? serviceEl.options[serviceEl.selectedIndex].text : '';

        const requirements = contactPopupForm.querySelector("#requirements");
        const message = requirements ? requirements.value.trim() : '';

        if (!fname || !email || !message) {
          Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please fill in Name, Email, and your requirements.'
          });
          return;
        }

        const submitBtn = contactPopupForm.querySelector('.cp-submit');
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        const templateParams = {
          fname: fname,
          lname: ' ', // Keep empty or space to avoid spam triggers in subject lines
          email: email,
          user_email: email,
          phone: phone || 'Not Specified',
          company: company || 'Not Specified',
          budget: 'Not Specified',
          service: service || 'Not Specified',
          message: message
        };

        function sendEmail() {
          emailjs.init('mtyXCsYdD3ElJGNum');
          const SERVICE_ID = 'service_cht9xji';
          const INTERNAL_TEMPLATE_ID = 'template_uqoo9yi';
          const THANKYOU_TEMPLATE_ID = 'template_qv65elf';

          emailjs.send(SERVICE_ID, INTERNAL_TEMPLATE_ID, templateParams)
            .then(() => {
              return emailjs.send(SERVICE_ID, THANKYOU_TEMPLATE_ID, templateParams);
            })
            .then(() => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;

              if (window.bootstrap) {
                const modalEl = document.getElementById("contactPopup");
                if (modalEl) {
                  const modal = bootstrap.Modal.getInstance(modalEl);
                  if (modal) modal.hide();
                }
              }
              contactPopupForm.reset();
              window.location.href = '/thank-you/';
            })
            .catch(err => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
              console.error('EmailJS Error:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to send message. Please try again.\n\nError: ' + (err.text || err)
              });
            });
        }

        if (typeof emailjs !== 'undefined') {
          sendEmail();
        } else {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.onload = sendEmail;
          document.head.appendChild(script);
        }
      });
    }
  })();

  // ─────────────────────────────────────────────
  // Custom Robot Tawk.to Chat Button
  // ─────────────────────────────────────────────

  const tawkButtonHTML = `
        <style>
            #custom-tawk-button {
                position: fixed;
                right: 20px;
                bottom: 20px;
                width: 90px;
                height: 90px;
                padding: 0;
                border: none;
                background: transparent;
                cursor: pointer;
                z-index: 999999;
                animation: tawk-float 3s ease-in-out infinite;
            }

            #custom-tawk-button img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
                transition: transform 0.25s ease;
            }

            #custom-tawk-button:hover img {
                transform: scale(1.1);
            }

            #custom-tawk-button:active img {
                transform: scale(0.95);
            }

            @keyframes tawk-float {
                0%, 100% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(-6px);
                }
            }

            @media (max-width: 768px) {
                #custom-tawk-button {
                    width: 70px;
                    height: 70px;
                    right: 15px;
                    bottom: 15px;
                }
            }
        </style>

        <button
            id="custom-tawk-button"
            type="button"
            aria-label="Open Chat"
        >
            <img
                src="/images/robot.webp"
                srcset="/images/robot-sm.webp 1x, /images/robot.webp 2x"
                alt="Chat with us"
                width="90"
                height="90"
                loading="lazy"
                decoding="async"
            >
        </button>
    `;

  document.body.insertAdjacentHTML("beforeend", tawkButtonHTML);

  const button = document.getElementById("custom-tawk-button");

  // Hide Tawk default launcher when Tawk is ready
  function hideTawkWidget() {
    if (
      window.Tawk_API &&
      typeof window.Tawk_API.hideWidget === "function"
    ) {
      window.Tawk_API.hideWidget();
    }
  }

  // Tawk API
  window.Tawk_API = window.Tawk_API || {};

  window.Tawk_API.onLoad = function () {
    hideTawkWidget();
  };

  // Custom robot click
  button.addEventListener("click", function () {
    if (
      window.Tawk_API &&
      typeof window.Tawk_API.toggle === "function"
    ) {
      window.Tawk_API.toggle();
    } else {
      console.log("Tawk.to is not loaded yet.");
    }
  });

});

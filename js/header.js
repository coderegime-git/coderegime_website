document.addEventListener("DOMContentLoaded", function () {
  // ─────────────────────────────────────────────
  // Centralized Header Loader & Controller
  // ─────────────────────────────────────────────

  /* CANONICAL_HEADER_START */
  const canonicalHeaderHTML = `<header id="head-nav" class="header">
  <nav>
    <!-- Logo -->
    <a href="/" class="logo">
      <img src="/images/color-logo-140.webp" srcset="/images/color-logo-280.webp 2x" width="140" height="140"
        alt="Code Regime Logo">
    </a>

    <!-- Navigation Menu -->
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="/" class="nav-link">Home</a>
      </li>
      <li class="nav-item">
        <a href="/about-us/" class="nav-link">About Us</a>
      </li>
      <li class="nav-item">
        <a href="javascript:void(0)" class="nav-link">
          Services
          <span class="dropdown-arrow"><img src="/images/dropdown.png" alt="" width="16" height="10"></span>
        </a>
        <ul class="dropdown">
          <li class="dropdown-item">
            <a href="/blockchain-development-services/" class="dropdown-link">Blockchain Development Services</a>
          </li>
          <li class="dropdown-item">
            <a href="/mobile-app-development/" class="dropdown-link">Mobile App Development</a>
          </li>
          <li class="dropdown-item">
            <a href="/ios-app-development/" class="dropdown-link">iOS App Development</a>
          </li>
          <li class="dropdown-item">
            <a href="/flutter-app-development/" class="dropdown-link">Flutter Development</a>
          </li>
          <li class="dropdown-item">
            <a href="/android-app-development/" class="dropdown-link">Android App Development</a>
          </li>
          <li class="dropdown-item">
            <a href="/web-app-development/" class="dropdown-link">Web App Development Services</a>
          </li>
          <li class="dropdown-item">
            <a href="/enterprise-app-development/" class="dropdown-link">Enterprise App Development</a>
          </li>
          <li class="dropdown-item">
            <a href="/custom-ai-social-media-management-app-development/" class="dropdown-link">AI Social Media Management</a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="javascript:void(0)" class="nav-link">
          Products
          <span class="dropdown-arrow"><img src="/images/dropdown.png" alt="" width="16" height="10"></span>
        </a>
        <ul class="dropdown">
          <li class="dropdown-item">
            <a href="/uber-clone/" class="dropdown-link">CabRegime - Uber Clone</a>
          </li>
          <li class="dropdown-item">
            <a href="/ubereats-clone/" class="dropdown-link">FoodRegime - Ubereats clone</a>
          </li>
          <li class="dropdown-item">
            <a href="/uber-for-handyman-app/" class="dropdown-link">HandymanRegime - Uber for Handman</a>
          </li>
          <li class="dropdown-item">
            <a href="/fintech-app-development/" class="dropdown-link">Fintech App</a>
          </li>
          <li class="dropdown-item">
            <a href="/flight-booking-app/" class="dropdown-link">Flight Booking App</a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="/Portfolio/" class="nav-link">Portfolio</a>
      </li>
      <li class="nav-item">
        <a href="/careers/" class="nav-link">Careers</a>
      </li>
      <li class="nav-item">
        <a href="/blog/" class="nav-link">Blog</a>
      </li>
      <li class="nav-item">
        <a href="/contact-us/" class="nav-link">Contact Us</a>
      </li>
    </ul>

    <!-- Mobile Menu Toggle -->
    <div class="mobile-toggle" aria-label="Toggle navigation menu" role="button" tabindex="0">
      <span class="hamburger"></span>
      <span class="hamburger"></span>
      <span class="hamburger"></span>
    </div>
  </nav>
</header>`;
  /* CANONICAL_HEADER_END */

  // 1. Fallback Placeholder Hydration (if static header was not pre-rendered)
  const headerPlaceholder = document.getElementById("site-header") ||
    document.getElementById("cr-header-placeholder") ||
    document.querySelector("site-header");

  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = canonicalHeaderHTML;
  }

  // 2. Mobile Menu & Dropdowns Interaction Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownItems = document.querySelectorAll('.nav-item');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    dropdownItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown');

      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('dropdown-open');
          }
        });
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });

    // Reset mobile menu on resize to desktop view
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        dropdownItems.forEach(item => {
          item.classList.remove('dropdown-open');
        });
      }
    });
  }

  // 3. Dynamic Active Navigation Link Detection
  const normalizePath = (p) => {
    if (!p) return '/';
    // Remove query params & hash
    let path = p.split('?')[0].split('#')[0];
    // Remove index.html
    path = path.replace(/\/index\.html$/i, '/');
    // Ensure leading slash
    if (!path.startsWith('/')) path = '/' + path;
    // Normalize trailing slash
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return path.toLowerCase();
  };

  const currentPath = normalizePath(window.location.pathname);

  const allNavLinks = document.querySelectorAll('.nav-menu a');
  let matchedLink = null;

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (!href || href.startsWith('javascript:')) return;

    const linkPath = normalizePath(href);
    if (linkPath === currentPath) {
      matchedLink = link;
    }
  });

  if (matchedLink) {
    matchedLink.classList.add('active');
    // If it's inside a dropdown, also highlight the parent nav-link
    const parentNavItem = matchedLink.closest('.nav-item');
    if (parentNavItem) {
      const parentLink = parentNavItem.querySelector(':scope > .nav-link');
      if (parentLink) {
        parentLink.classList.add('active');
      }
    }
  }
});

// ─── GLOBAL JS — The Drain Team ───────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ─── INJECT NAVBAR ─────────────────────────────────
  const isSubpage = window.location.pathname.includes('/pages/');
  const base = isSubpage ? '../' : '';

  const navbarHTML = `
    <nav class="navbar" id="navbar">
      <a href="${base}index.html" class="nav-logo">
        <img src="${base}assets/images/logos/Logo_%20White.png" alt="The Drain Team" class="nav-logo-img">
      </a>
      <div class="nav-links">
        <a href="${base}index.html" class="nav-link">Home</a>
        <a href="${base}pages/about.html" class="nav-link">About</a>
        <a href="${base}pages/services.html" class="nav-link">Services</a>
        <a href="${base}pages/contact.html" class="nav-link">Contact</a>
        <a href="tel:+35318001234" class="nav-emergency">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          01 800 1234
        </a>
        <a href="${base}pages/contact.html" class="btn btn-red nav-cta">Get a Quote</a>
      </div>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="navMobile">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-mobile" id="navMobile">
      <a href="${base}index.html" class="nav-link">Home</a>
      <a href="${base}pages/about.html" class="nav-link">About</a>
      <a href="${base}pages/services.html" class="nav-link">Services</a>
      <a href="${base}pages/contact.html" class="nav-link">Contact</a>
      <a href="${base}pages/contact.html" class="btn btn-red nav-cta">Get a Quote</a>
      <a href="tel:+35318001234" class="nav-emergency" style="color:rgba(255,255,255,0.7)">
        Emergency: 01 800 1234
      </a>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // ─── SKIP LINK ────────────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', `<a href="#main-content" class="skip-link">Skip to main content</a>`);

  // ─── INJECT TICKER ────────────────────────────────
  const items = [
    '24/7 Emergency Plumbing', 'Blocked Drains', 'Leak Detection',
    'Drain Unblocking', 'Pipe Repairs', 'CCTV Surveys', 'Water Systems',
    'Bathroom Plumbing', 'Kitchen Plumbing', 'Serving All Dublin'
  ];
  const tickerContent = items.concat(items).map(t => `<span>${t}</span>`).join('');
  const tickerHTML = `<div class="ticker" id="ticker"><div class="ticker-track">${tickerContent}</div></div>`;

  // Insert ticker after navbar (in hero pages, before hero content)
  const heroEl = document.querySelector('.hero');
  const navEl  = document.getElementById('navbar');
  if (heroEl) {
    // For home page — ticker goes below hero
    heroEl.insertAdjacentHTML('afterend', tickerHTML);
  } else {
    // For inner pages — ticker goes just below hero
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) pageHero.insertAdjacentHTML('afterend', tickerHTML);
  }

  // ─── INJECT FOOTER ────────────────────────────────
  const footerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-top">
          <div>
            <img src="${base}assets/images/logos/Logo_%20White.png" alt="The Drain Team" class="footer-logo-img">
            <p class="footer-tagline">Dublin's trusted plumbing & drainage specialists. Available 24/7 for emergency callouts across the city and surrounding counties.</p>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              01 800 1234
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              info@thedrainteam.ie
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Dublin City & Surrounding Counties
            </div>
          </div>
          <div>
            <p class="footer-col-title">Navigation</p>
            <div class="footer-links">
              <a href="${base}index.html">Home</a>
              <a href="${base}pages/about.html">About Us</a>
              <a href="${base}pages/services.html">Our Services</a>
              <a href="${base}pages/contact.html">Contact</a>
            </div>
          </div>
          <div>
            <p class="footer-col-title">Services</p>
            <div class="footer-links">
              <a href="${base}pages/services.html">Drain Unblocking</a>
              <a href="${base}pages/services.html">Leak Detection</a>
              <a href="${base}pages/services.html">CCTV Surveys</a>
              <a href="${base}pages/services.html">Pipe Repair</a>
              <a href="${base}pages/services.html">Bathroom Plumbing</a>
              <a href="${base}pages/services.html">Emergency Callout</a>
            </div>
          </div>
          <div>
            <p class="footer-col-title">Service Areas</p>
            <div class="footer-links">
              <a href="#">Dublin City</a>
              <a href="#">South Dublin</a>
              <a href="#">North Dublin</a>
              <a href="#">Kildare</a>
              <a href="#">Meath</a>
              <a href="#">Wicklow</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">© ${new Date().getFullYear()} The Drain Team. All rights reserved. | <a href="https://www.thedrainteam.ie" style="color:inherit">thedrainteam.ie</a></p>
          <p class="footer-credit">Site by <a href="https://neexcreative.com" target="_blank">Neex Creative</a></p>
        </div>
      </div>
      <div class="footer-pipes-decoration" aria-hidden="true">
        <img src="${base}assets/images/gallery/Pipes.png" alt="">
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ─── ACTIVE NAV LINK ──────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href.includes(path.split('/').pop()) && path !== '/') {
      link.classList.add('active');
    }
    if (path === '/' || path.endsWith('index.html')) {
      document.querySelector('.nav-link[href*="index"]')?.classList.add('active');
    }
  });

  // ─── SCROLL: NAVBAR ──────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Dark bg for inner pages
  if (!document.querySelector('.hero')) {
    navbar?.classList.add('dark-bg');
  }

  // ─── HAMBURGER MENU ──────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  const closeMenu = () => {
    navMobile?.classList.remove('open');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  };
  const openMenu = () => {
    navMobile?.classList.add('open');
    hamburger?.classList.add('active');
    hamburger?.setAttribute('aria-expanded', 'true');
    hamburger?.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = navMobile?.classList.contains('open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  navMobile?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile?.classList.contains('open')) {
      closeMenu();
      hamburger?.focus();
    }
  });

  // ─── SCROLL ANIMATIONS ───────────────────────────
  const animEls = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animEls.forEach(el => observer.observe(el));

  // ─── CONTACT FORM ────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        form.querySelector('.form-success').style.display = 'block';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          form.querySelector('.form-success').style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

});

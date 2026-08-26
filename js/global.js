// ─── GLOBAL JS — The Drain Team ─────────────────────────
// Behaviour only. All navigation, footer and content markup lives in the
// HTML files so the site works fully with JavaScript disabled.

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Opt in to scroll-reveal animations only when JS runs, the browser
  // supports IntersectionObserver and the user hasn't asked for reduced
  // motion. Without the `js` class, content is simply visible.
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
  }

  document.addEventListener('DOMContentLoaded', function () {

    // ─── HOMEPAGE WHATSAPP WIDGET ───────────────────────
    var whatsappWidget = document.querySelector('.whatsapp-widget');
    if (whatsappWidget) {
      var whatsappToggle = whatsappWidget.querySelector('.whatsapp-widget__toggle');
      var whatsappClose = whatsappWidget.querySelector('.whatsapp-widget__close');

      document.documentElement.classList.add('whatsapp-enhanced');

      var closeWhatsapp = function (returnFocus) {
        whatsappWidget.classList.remove('is-open');
        whatsappToggle.setAttribute('aria-expanded', 'false');
        whatsappToggle.setAttribute('aria-label', 'Open WhatsApp chat prompt');
        if (returnFocus) whatsappToggle.focus();
      };

      whatsappToggle.addEventListener('click', function (event) {
        event.preventDefault();
        var opening = !whatsappWidget.classList.contains('is-open');
        whatsappWidget.classList.toggle('is-open', opening);
        whatsappToggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
        whatsappToggle.setAttribute('aria-label', opening ? 'Close WhatsApp chat prompt' : 'Open WhatsApp chat prompt');
      });

      whatsappClose.addEventListener('click', function () {
        closeWhatsapp(true);
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && whatsappWidget.classList.contains('is-open')) {
          closeWhatsapp(true);
        }
      });
    }

    // ─── NAVBAR SCROLL STATE ─────────────────────────────
    var navbar = document.getElementById('navbar');
    if (navbar) {
      var onScroll = function () {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // ─── MOBILE MENU ─────────────────────────────────────
    var hamburger = document.getElementById('hamburger');
    var navMobile = document.getElementById('navMobile');

    if (hamburger && navMobile) {
      var closeMenu = function (returnFocus) {
        navMobile.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        document.body.classList.remove('nav-open');
        if (returnFocus) hamburger.focus();
      };
      var openMenu = function () {
        navMobile.classList.add('open');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Close menu');
        document.body.classList.add('nav-open');
      };

      hamburger.addEventListener('click', function () {
        if (navMobile.classList.contains('open')) {
          closeMenu(false);
        } else {
          openMenu();
        }
      });

      // Close when a mobile navigation link is selected
      navMobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { closeMenu(false); });
      });

      // Close with Escape and return focus to the toggle
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMobile.classList.contains('open')) {
          closeMenu(true);
        }
      });

      // Close when resizing up to the desktop layout
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navMobile.classList.contains('open')) {
          closeMenu(false);
        }
      });
    }

    // ─── HOMEPAGE HERO ENTRANCE (GSAP, homepage only) ────
    // Isolated, defensive: only runs if GSAP loaded, motion is allowed,
    // and the Hero markup is present. Never throws on inner pages, where
    // GSAP is not even loaded. Content has no inline/CSS hidden state, so
    // if GSAP fails to load or this block errors, the Hero stays visible.
    var initHomepageHeroAnimation = function () {
      if (prefersReducedMotion) return;
      if (typeof window.gsap === 'undefined') return;

      var hero = document.querySelector('.hero');
      if (!hero) return;

      var title = hero.querySelector('.hero-title');
      var sub = hero.querySelector('.hero-sub');
      var actions = hero.querySelectorAll('.hero-actions a');

      var tl = window.gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (title) tl.from(title, { opacity: 0, y: 20, duration: 0.5 });
      if (sub) tl.from(sub, { opacity: 0, y: 16, duration: 0.4 }, '-=0.25');
      if (actions.length) tl.from(actions, { y: 14, duration: 0.35, stagger: 0.08, clearProps: 'transform' }, '-=0.2');
    };
    initHomepageHeroAnimation();

    // HOMEPAGE COUNTING NUMBERS
    var initCountingNumbers = function () {
      var counters = document.querySelectorAll('.counting-number');
      if (!counters.length) return;

      var formatter = new Intl.NumberFormat(document.documentElement.lang || 'en');
      var finalValue = function (counter) {
        return (counter.getAttribute('data-count-prefix') || '') +
          formatter.format(Number(counter.getAttribute('data-count-to')) || 0) +
          (counter.getAttribute('data-count-suffix') || '');
      };
      var showFinalValue = function (counter) {
        counter.textContent = finalValue(counter);
        counter.setAttribute('data-count-complete', 'true');
      };

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        counters.forEach(showFinalValue);
        return;
      }

      var animateCounter = function (counter) {
        if (counter.getAttribute('data-count-complete') === 'true' ||
            counter.getAttribute('data-counting') === 'true') return;

        var from = Number(counter.getAttribute('data-count-from')) || 0;
        var to = Number(counter.getAttribute('data-count-to')) || 0;
        var prefix = counter.getAttribute('data-count-prefix') || '';
        var suffix = counter.getAttribute('data-count-suffix') || '';
        var duration = 1100;
        var startTime;

        counter.setAttribute('data-counting', 'true');
        counter.textContent = prefix + formatter.format(from) + suffix;

        var update = function (timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(from + (to - from) * eased);
          counter.textContent = prefix + formatter.format(value) + suffix;

          if (progress < 1) {
            window.requestAnimationFrame(update);
          } else {
            counter.removeAttribute('data-counting');
            showFinalValue(counter);
          }
        };
        window.requestAnimationFrame(update);
      };

      var countingObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countingObserver.unobserve(entry.target);
          animateCounter(entry.target);
        });
      }, { threshold: 0.35 });

      counters.forEach(function (counter) {
        countingObserver.observe(counter);
      });
    };
    initCountingNumbers();

    // GOOGLE REVIEWS — renders only data returned by the server-side endpoint
    var initGoogleReviews = function () {
      var section = document.querySelector('[data-google-reviews]');
      if (!section || typeof window.fetch !== 'function') return;

      var summary = section.querySelector('[data-google-reviews-summary]');
      var list = section.querySelector('[data-google-reviews-list]');
      var empty = section.querySelector('[data-google-reviews-empty]');
      var googleLink = section.querySelector('[data-google-reviews-link]');
      if (!summary || !list || !empty || !googleLink) return;

      var renderStars = function (rating) {
        var rounded = Math.max(0, Math.min(5, Math.round(rating)));
        return '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded);
      };
      var addTextElement = function (parent, tagName, className, value) {
        var element = document.createElement(tagName);
        element.className = className;
        element.textContent = value;
        parent.appendChild(element);
        return element;
      };

      var showEmpty = function (message) {
        empty.textContent = message;
        empty.hidden = false;
      };

      showEmpty('Loading Google reviews…');

      window.fetch('/api/google-reviews', { headers: { 'Accept': 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error('Reviews unavailable');
          return response.json();
        })
        .then(function (data) {
          if (!data || data.ok !== true) {
            showEmpty(data && data.configured === false
              ? 'Google reviews are being connected. Please check back soon.'
              : 'Google reviews could not be loaded right now.');
            return;
          }

          var rating = Number(data.rating);
          var reviewCount = Number(data.reviewCount);
          summary.textContent = '';
          list.textContent = '';

          if (Number.isFinite(rating) && rating > 0 && rating <= 5 &&
              Number.isFinite(reviewCount) && reviewCount >= 0) {
            addTextElement(summary, 'div', 'google-reviews-summary__rating', rating.toFixed(1));
            var summaryStars = addTextElement(summary, 'div', 'google-reviews-summary__stars', renderStars(rating));
            summaryStars.setAttribute('aria-label', rating.toFixed(1) + ' out of 5 stars');
            addTextElement(summary, 'p', 'google-reviews-summary__count',
              'Based on ' + new Intl.NumberFormat(document.documentElement.lang || 'en').format(reviewCount) + ' Google reviews');
          }

          var reviews = Array.isArray(data.reviews) ? data.reviews.slice(0, 3) : [];
          reviews.forEach(function (review) {
            var card = document.createElement('article');
            card.className = 'google-review-card';
            if (review.authorName) addTextElement(card, 'p', 'google-review-card__author', review.authorName);
            var reviewRating = Number(review.rating);
            if (Number.isFinite(reviewRating) && reviewRating >= 0 && reviewRating <= 5) {
              var stars = addTextElement(card, 'div', 'google-review-card__stars', renderStars(reviewRating));
              stars.setAttribute('aria-label', reviewRating + ' out of 5 stars');
            }
            if (review.text) addTextElement(card, 'p', 'google-review-card__text', review.text);
            if (review.relativeTimeDescription) {
              addTextElement(card, 'p', 'google-review-card__time', review.relativeTimeDescription);
            }
            list.appendChild(card);
          });

          if (reviews.length) {
            empty.hidden = true;
          } else {
            showEmpty('Google reviews will appear here once available.');
          }

          if (data.googleMapsUrl) {
            try {
              var mapsUrl = new URL(data.googleMapsUrl);
              if (mapsUrl.protocol === 'https:') {
                googleLink.href = mapsUrl.href;
                googleLink.hidden = false;
              }
            } catch (error) {
              googleLink.hidden = true;
            }
          }
        })
        .catch(function () {
          showEmpty('Google reviews could not be loaded right now.');
        });
    };
    initGoogleReviews();

    // ─── SCROLL-REVEAL ANIMATIONS ────────────────────────
    var animEls = document.querySelectorAll('.animate-in');
    if (document.documentElement.classList.contains('js') && animEls.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      animEls.forEach(function (el) { observer.observe(el); });
    }

    // ─── CONTACT FORM ────────────────────────────────────
    // The form endpoint is configured via the data-endpoint attribute in
    // pages/contact.html. Success is shown only when the provider confirms it.
    var form = document.getElementById('contactForm');
    if (form) {
      var statusEl = document.getElementById('formStatus');
      var submitBtn = form.querySelector('button[type="submit"]');
      var endpoint = (form.getAttribute('data-endpoint') || '').trim();
      if (submitBtn) submitBtn.disabled = false;

      var showStatus = function (type, message) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.classList.remove('form-status--success', 'form-status--error');
        statusEl.classList.add('is-visible', 'form-status--' + type);
      };

      var setFieldError = function (field, hasError) {
        var errorEl = document.getElementById(field.id + '-error');
        field.setAttribute('aria-invalid', hasError ? 'true' : 'false');
        if (errorEl) errorEl.hidden = !hasError;
      };

      var validate = function () {
        var valid = true;
        form.querySelectorAll('[required]').forEach(function (field) {
          var value = field.value.trim();
          var fieldValid = value.length > 0;
          if (fieldValid && field.type === 'email') {
            fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          }
          setFieldError(field, !fieldValid);
          if (!fieldValid && valid) {
            field.focus();
            valid = false;
          }
        });
        return valid;
      };

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!submitBtn || submitBtn.disabled) return;

        // Honeypot: silently drop obvious bot submissions
        var honeypot = form.querySelector('#company');
        if (honeypot && honeypot.value) return;

        if (!validate()) {
          showStatus('error', 'Please correct the highlighted fields and try again.');
          return;
        }

        if (!endpoint) {
          // No delivery endpoint configured yet — tell the truth.
          showStatus('error',
            'Sorry — online enquiries are not available yet. ' +
            'Please try again later while we finish setting up this page.');
          return;
        }

        submitBtn.disabled = true;
        var originalLabel = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        }).then(function (response) {
          if (!response.ok) throw new Error('Request failed: ' + response.status);
          return response.json();
        }).then(function (result) {
          var message = result && typeof result.message === 'string' ? result.message : '';
          var requiresActivation = /activat|confirm|verify/i.test(message);
          var confirmed = result && (result.success === true || result.success === 'true');

          if (requiresActivation) {
            showStatus('error', 'Your enquiry could not be confirmed as delivered because the form email needs activation. Please call or WhatsApp the team instead.');
            return;
          }

          if (!confirmed) throw new Error('Submission was not confirmed');

          form.reset();
          showStatus('success', 'Thanks. Your message has been sent to The Drain Team.');
        }).catch(function () {
          showStatus('error', 'Sorry, your message could not be sent. Please call or WhatsApp the team instead.');
        }).finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
      });
    }

  });
})();

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

    // HOMEPAGE FAN GALLERY + LIGHTBOX
    var initHomeGallery = function () {
      var gallery = document.querySelector('[data-home-fan-gallery]');
      var fanStage = document.querySelector('[data-home-fan-stage]');
      var lightbox = document.querySelector('[data-home-gallery-lightbox]');
      if (!gallery || !fanStage || !lightbox) return;

      var cards = Array.prototype.slice.call(fanStage.querySelectorAll('[data-home-fan-card]'));
      var fanPreviousButton = gallery.querySelector('[data-home-fan-previous]');
      var fanNextButton = gallery.querySelector('[data-home-fan-next]');
      var fanStatus = gallery.querySelector('[data-home-fan-status]');
      var lightboxImage = lightbox.querySelector('[data-gallery-lightbox-image]');
      var stage = lightbox.querySelector('[data-gallery-stage]');
      var closeButton = lightbox.querySelector('[data-gallery-close]');
      var previousButton = lightbox.querySelector('[data-gallery-previous]');
      var nextButton = lightbox.querySelector('[data-gallery-next]');
      if (!cards.length || !fanPreviousButton || !fanNextButton || !fanStatus ||
          !lightboxImage || !stage || !closeButton || !previousButton || !nextButton) return;

      var activeIndex = 0;
      var lightboxIndex = 0;
      var lastTrigger = null;
      var suppressCardClick = false;

      var getFanPosition = function (index) {
        var distance = (index - activeIndex + cards.length) % cards.length;
        if (distance > cards.length / 2) distance -= cards.length;
        if (distance === 0) return 'active';
        if (distance === -1) return 'left';
        if (distance === 1) return 'right';
        if (distance === -2) return 'far-left';
        if (distance === 2) return 'far-right';
        return 'hidden';
      };

      var updateFan = function () {
        cards.forEach(function (card, index) {
          var position = getFanPosition(index);
          var image = card.querySelector('img');
          var description = image ? image.alt : 'Gallery photo';
          card.setAttribute('data-fan-position', position);
          card.classList.toggle('home-fan-card--active', position === 'active');
          card.tabIndex = position === 'hidden' ? -1 : 0;
          if (position === 'hidden') {
            card.setAttribute('aria-hidden', 'true');
          } else {
            card.removeAttribute('aria-hidden');
          }
          if (position === 'active') {
            card.setAttribute('aria-current', 'true');
            card.setAttribute('aria-label', 'Open ' + description + ' in fullscreen');
          } else {
            card.removeAttribute('aria-current');
            card.setAttribute('aria-label', 'Bring ' + description + ' to the centre');
          }
        });
        fanStatus.textContent = 'Photo ' + (activeIndex + 1) + ' of ' + cards.length;
      };

      var setActive = function (index) {
        activeIndex = (index + cards.length) % cards.length;
        updateFan();
      };

      var updateLightbox = function () {
        var image = cards[lightboxIndex].querySelector('img');
        if (!image) return;
        lightboxImage.src = image.getAttribute('src');
        lightboxImage.alt = image.alt;
        lightbox.setAttribute('aria-label',
          'Fullscreen photo viewer: ' + image.alt + '. Photo ' +
          (lightboxIndex + 1) + ' of ' + cards.length + '.');
      };

      var openLightbox = function (index, trigger) {
        lightboxIndex = index;
        lastTrigger = trigger;
        updateLightbox();
        lightbox.hidden = false;
        document.body.classList.add('home-gallery-lightbox-open');
        closeButton.focus();
      };

      var closeLightbox = function () {
        if (lightbox.hidden) return;
        lightbox.hidden = true;
        document.body.classList.remove('home-gallery-lightbox-open');
        if (lastTrigger) lastTrigger.focus();
      };

      var showPrevious = function () {
        lightboxIndex = (lightboxIndex - 1 + cards.length) % cards.length;
        updateLightbox();
      };

      var showNext = function () {
        lightboxIndex = (lightboxIndex + 1) % cards.length;
        updateLightbox();
      };

      cards.forEach(function (card, index) {
        card.addEventListener('click', function () {
          if (suppressCardClick) return;
          if (index === activeIndex) {
            openLightbox(index, card);
          } else {
            setActive(index);
          }
        });
      });

      fanPreviousButton.addEventListener('click', function () {
        setActive(activeIndex - 1);
      });
      fanNextButton.addEventListener('click', function () {
        setActive(activeIndex + 1);
      });

      gallery.addEventListener('keydown', function (event) {
        if (!lightbox.hidden) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setActive(activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          setActive(activeIndex + 1);
        }
      });

      closeButton.addEventListener('click', closeLightbox);
      previousButton.addEventListener('click', showPrevious);
      nextButton.addEventListener('click', showNext);
      fanPreviousButton.hidden = cards.length < 2;
      fanNextButton.hidden = cards.length < 2;
      previousButton.hidden = cards.length < 2;
      nextButton.hidden = cards.length < 2;

      lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox || event.target === stage) closeLightbox();
      });

      document.addEventListener('keydown', function (event) {
        if (lightbox.hidden) return;

        if (event.key === 'Escape') {
          event.preventDefault();
          closeLightbox();
          return;
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showPrevious();
          return;
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showNext();
          return;
        }
        if (event.key === 'Tab') {
          var controls = [closeButton, previousButton, nextButton].filter(function (control) {
            return !control.hidden;
          });
          var firstControl = controls[0];
          var lastControl = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === firstControl) {
            event.preventDefault();
            lastControl.focus();
          } else if (!event.shiftKey && document.activeElement === lastControl) {
            event.preventDefault();
            firstControl.focus();
          }
        }
      });

      var swipeActive = false;
      var swipeStartX = 0;
      var swipeStartY = 0;

      fanStage.addEventListener('pointerdown', function (event) {
        if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
        swipeActive = true;
        swipeStartX = event.clientX;
        swipeStartY = event.clientY;
        if (fanStage.setPointerCapture) fanStage.setPointerCapture(event.pointerId);
      });

      fanStage.addEventListener('pointermove', function (event) {
        if (!swipeActive) return;
        var distanceX = event.clientX - swipeStartX;
        var distanceY = event.clientY - swipeStartY;
        if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > 8) {
          event.preventDefault();
        }
      });

      var finishSwipe = function (event) {
        if (!swipeActive) return;
        swipeActive = false;
        var distanceX = event.clientX - swipeStartX;
        var distanceY = event.clientY - swipeStartY;
        if (Math.abs(distanceX) >= 48 && Math.abs(distanceX) > Math.abs(distanceY)) {
          setActive(activeIndex + (distanceX < 0 ? 1 : -1));
          suppressCardClick = true;
          window.setTimeout(function () { suppressCardClick = false; }, 0);
        }
        if (fanStage.releasePointerCapture && fanStage.hasPointerCapture &&
            fanStage.hasPointerCapture(event.pointerId)) {
          fanStage.releasePointerCapture(event.pointerId);
        }
      };

      fanStage.addEventListener('pointerup', finishSwipe);
      fanStage.addEventListener('pointercancel', function () { swipeActive = false; });
      fanStage.addEventListener('dragstart', function (event) { event.preventDefault(); });

      updateFan();
    };
    initHomeGallery();

    // GOOGLE REVIEWS — temporary data is replaced when the server-side endpoint returns reviews
    var initGoogleReviews = function () {
      var section = document.querySelector('[data-google-reviews]');
      if (!section) return;

      var slider = section.querySelector('[data-google-reviews-slider]');
      var list = section.querySelector('[data-google-reviews-list]');
      var previousButton = section.querySelector('[data-google-reviews-previous]');
      var nextButton = section.querySelector('[data-google-reviews-next]');
      var googleLink = section.querySelector('[data-google-reviews-link]');
      if (!slider || !list || !previousButton || !nextButton || !googleLink) return;

      var temporaryReviews = [
        { name: 'Edward Clancy', rating: 5, date: '', text: 'From the initial contact and works carried out everything was very professional. This is an old building that was built in stages with many different drain ...', initial: 'E' },
        { name: 'Adele Valbergs', rating: 5, date: '', text: 'These pair should be called the dream team they came within an hour cleared blockage cleaned everything after then disinfected bathroom and garden lovely chatty lads I felt very comfortable from the start highly recommend very reasonable price also', initial: 'A' },
        { name: 'Stephen Kirwan', rating: 5, date: '', text: 'Contacted Alan and his team as our waste pipe in the back garden was fully blocked, with our toilets backing up. Alan and his team responded quickly, came on ...', initial: 'S' },
        { name: 'Alan Murphy', rating: 5, date: '', text: 'Lads where bang on time, done the job fantastic these lads take pride in their work, the way they left the job so clean the Mrs was over the moon too.', initial: 'A' },
        { name: 'Peter Mulhall', rating: 5, date: '', text: 'We had the drain team out this morning as we had a bad blockage in our waste pipe/soil and also a leaking multi wick, alan was prompt with his communication ...', initial: 'P' },
        { name: 'Justin Mc G', rating: 5, date: '', text: 'The Drain Team are the A-team! They handled a very tricky, awkward waste pipe redirection at my home with absolute professionalism. Not only did they complete ...', initial: 'J' },
        { name: 'Jessica Ormond', rating: 5, date: '', text: 'The lads did a great job I\'d highly recommend the were quick clean an efficient thanks again lads great work 👏', initial: 'J' },
        { name: 'Kelly Campbell', rating: 5, date: '', text: 'The Drain Team came highly recommended and met all expectations. They responded immediately and were with us within the hour, then returned promptly when the ...', initial: 'K' }
      ];

      var renderStars = function (rating) {
        var rounded = Math.max(0, Math.min(5, Math.round(rating)));
        return '\u2605\u2605\u2605\u2605\u2605'.slice(0, rounded) + '\u2606\u2606\u2606\u2606\u2606'.slice(0, 5 - rounded);
      };
      var addTextElement = function (parent, tagName, className, value) {
        var element = document.createElement(tagName);
        element.className = className;
        element.textContent = value;
        parent.appendChild(element);
        return element;
      };

      var reviews = [];
      var cards = [];
      var activeIndex = 0;
      var swipeStartX = null;
      var swipeStartY = null;
      var autoplayTimer = null;
      var autoplayInterval = 10000;
      var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      var getReviewPosition = function (index) {
        var distance = (index - activeIndex + cards.length) % cards.length;
        if (distance > cards.length / 2) distance -= cards.length;
        if (distance === 0) return 'active';
        if (distance === -1) return 'previous';
        if (distance === 1) return 'next';
        if (distance === -2) return 'far-previous';
        if (distance === 2) return 'far-next';
        return 'hidden';
      };

      var updateReviewSlider = function () {
        cards.forEach(function (card, index) {
          var position = getReviewPosition(index);
          card.dataset.reviewPosition = position;
          card.tabIndex = position === 'active' ? 0 : -1;
          card.setAttribute('aria-hidden', position === 'hidden' ? 'true' : 'false');
          if (position === 'active') {
            card.setAttribute('aria-current', 'true');
          } else {
            card.removeAttribute('aria-current');
          }
        });
      };

      var showReview = function (index) {
        if (!reviews.length) return;
        activeIndex = (index + reviews.length) % reviews.length;
        updateReviewSlider();
      };

      var stopAutoplay = function () {
        if (autoplayTimer !== null) {
          window.clearTimeout(autoplayTimer);
          autoplayTimer = null;
        }
      };

      var scheduleAutoplay = function () {
        stopAutoplay();
        if (cards.length < 2 || reducedMotionQuery.matches || document.hidden) return;
        autoplayTimer = window.setTimeout(function () {
          showReview(activeIndex + 1);
          scheduleAutoplay();
        }, autoplayInterval);
      };

      var renderReviewSlider = function (reviewData) {
        reviews = reviewData;
        activeIndex = 0;
        list.textContent = '';

        reviews.forEach(function (review) {
          var card = document.createElement('article');
          card.className = 'google-review-card';
          card.setAttribute('role', 'listitem');
          card.setAttribute('aria-label', review.rating + '-star Google review from ' + review.name);

          var header = document.createElement('div');
          header.className = 'google-review-card__header';
          addTextElement(header, 'span', 'google-review-card__avatar', review.initial || review.name.charAt(0));
          var identity = document.createElement('div');
          identity.className = 'google-review-card__identity';
          addTextElement(identity, 'p', 'google-review-card__author', review.name);
          addTextElement(identity, 'p', 'google-review-card__label', 'Google Review');
          header.appendChild(identity);
          card.appendChild(header);

          var stars = addTextElement(card, 'div', 'google-review-card__stars', renderStars(review.rating));
          stars.setAttribute('aria-label', review.rating + ' out of 5 stars');
          if (review.text) addTextElement(card, 'p', 'google-review-card__text', review.text);
          if (review.date) addTextElement(card, 'p', 'google-review-card__time', review.date);
          list.appendChild(card);
        });

        cards = Array.prototype.slice.call(list.querySelectorAll('.google-review-card'));
        var hasMultipleReviews = cards.length > 1;
        previousButton.hidden = !hasMultipleReviews;
        nextButton.hidden = !hasMultipleReviews;
        updateReviewSlider();
        scheduleAutoplay();
      };

      renderReviewSlider(temporaryReviews);

      previousButton.addEventListener('click', function () {
        showReview(activeIndex - 1);
        scheduleAutoplay();
      });
      nextButton.addEventListener('click', function () {
        showReview(activeIndex + 1);
        scheduleAutoplay();
      });
      slider.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        showReview(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
        if (event.target.classList.contains('google-review-card')) cards[activeIndex].focus();
        scheduleAutoplay();
      });

      slider.addEventListener('pointerdown', function (event) {
        if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
        swipeStartX = event.clientX;
        swipeStartY = event.clientY;
      });
      slider.addEventListener('pointerup', function (event) {
        if (swipeStartX === null || swipeStartY === null) return;
        var distanceX = event.clientX - swipeStartX;
        var distanceY = event.clientY - swipeStartY;
        swipeStartX = null;
        swipeStartY = null;
        if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
        showReview(activeIndex + (distanceX < 0 ? 1 : -1));
        scheduleAutoplay();
      });
      slider.addEventListener('pointercancel', function () {
        swipeStartX = null;
        swipeStartY = null;
        scheduleAutoplay();
      });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          stopAutoplay();
        } else {
          scheduleAutoplay();
        }
      });
      var handleReducedMotionChange = function () {
        if (reducedMotionQuery.matches) {
          stopAutoplay();
        } else {
          scheduleAutoplay();
        }
      };
      if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
      } else if (typeof reducedMotionQuery.addListener === 'function') {
        reducedMotionQuery.addListener(handleReducedMotionChange);
      }

      if (typeof window.fetch !== 'function') return;

      window.fetch('/api/google-reviews', { headers: { 'Accept': 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error('Reviews unavailable');
          return response.json();
        })
        .then(function (data) {
          if (!data || data.ok !== true || !Array.isArray(data.reviews) || !data.reviews.length) return;

          var liveReviews = data.reviews.map(function (review) {
            var name = review.authorName || 'Google customer';
            var rating = Number(review.rating);
            return {
              name: name,
              rating: Number.isFinite(rating) ? rating : 5,
              date: review.relativeTimeDescription || '',
              text: review.text || '',
              initial: name.charAt(0).toUpperCase()
            };
          });
          renderReviewSlider(liveReviews);

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
        .catch(function () { /* Keep the temporary review data visible. */ });
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
          showStatus('error', 'Sorry, online enquiries are unavailable right now. Please try again later.');
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
            showStatus('error', 'Your enquiry could not be confirmed as delivered. Please try again later.');
            return;
          }

          if (!confirmed) throw new Error('Submission was not confirmed');

          form.reset();
          showStatus('success', 'Thanks. Your message has been sent to The Drain Team.');
        }).catch(function () {
          showStatus('error', 'Sorry, your message could not be sent. Please try again later.');
        }).finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
      });
    }

  });
})();

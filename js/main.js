/* ===== SMART WASH — JavaScript Engine ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('done');
        setTimeout(() => preloader.style.display = 'none', 600);
      }, 800);
    });
  }

  // ===== SCROLL PROGRESS =====
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== CUSTOM CURSOR =====
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX - 4 + 'px';
      cursorDot.style.top = mouseY - 4 + 'px';
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX - 18 + 'px';
      cursorRing.style.top = ringY - 18 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .btn, .product-card, .feature-card, .benefit-card, .faq-question').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  // ===== REVEAL ON SCROLL =====
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.count-up');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ===== HERO PARTICLES =====
  const heroParticles = document.querySelector('.hero-particles');
  if (heroParticles) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      const size = Math.random() * 30 + 10;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      heroParticles.appendChild(particle);
    }
  }

  // ===== PRODUCT CARD HOVER =====
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

  // ===== FAQS =====
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ===== QUOTE CAROUSEL =====
  const quoteSlides = document.querySelectorAll('.quote-slide');
  const quoteDots = document.querySelectorAll('.qdot');
  let currentQuote = 0;
  let quoteInterval;

  function showQuote(idx) {
    quoteSlides.forEach(s => s.classList.remove('active'));
    quoteDots.forEach(d => d.classList.remove('active'));
    if (quoteSlides[idx]) quoteSlides[idx].classList.add('active');
    if (quoteDots[idx]) quoteDots[idx].classList.add('active');
    currentQuote = idx;
  }

  function nextQuote() {
    const next = (currentQuote + 1) % quoteSlides.length;
    showQuote(next);
  }

  function prevQuote() {
    const prev = (currentQuote - 1 + quoteSlides.length) % quoteSlides.length;
    showQuote(prev);
  }

  if (quoteSlides.length > 1) {
    quoteDots.forEach((dot, i) => dot.addEventListener('click', () => showQuote(i)));
    const qLeft = document.querySelector('.q-arrow-left');
    const qRight = document.querySelector('.q-arrow-right');
    if (qLeft) qLeft.addEventListener('click', () => { prevQuote(); clearInterval(quoteInterval); startQuoteAuto(); });
    if (qRight) qRight.addEventListener('click', () => { nextQuote(); clearInterval(quoteInterval); startQuoteAuto(); });
    
    function startQuoteAuto() {
      quoteInterval = setInterval(nextQuote, 6000);
    }
    startQuoteAuto();
    showQuote(0);
  }

  // ===== MODALS =====
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modal);
      if (modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('open');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHORS =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== TILT EFFECT =====
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===== FORM SUBMIT =====
  document.querySelectorAll('.apply-form, .contact-form-card form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit, .btn-primary');
      if (btn) {
        btn.textContent = '✓ SENT SUCCESSFULLY';
        btn.classList.add('success');
        setTimeout(() => {
          btn.textContent = btn.dataset.original || 'SUBMIT';
          btn.classList.remove('success');
        }, 3000);
      }
    });
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img') || item.querySelector('.gallery-placeholder');
        if (img) {
          lightbox.querySelector('img').src = img.src || '';
          lightbox.classList.add('open');
        }
      });
    });
    const lbClose = lightbox.querySelector('.lb-close');
    if (lbClose) {
      lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
    }
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // ===== TYPING EFFECT =====
  document.querySelectorAll('.type-text').forEach(el => {
    const text = el.dataset.text;
    let idx = 0;
    el.textContent = '';
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          function type() {
            if (idx < text.length) {
              el.textContent += text.charAt(idx);
              idx++;
              setTimeout(type, 40);
            }
          }
          type();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  // ===== MAGNETIC BUTTONS =====
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ===== PAGE TRANSITION =====
  const ptOverlay = document.getElementById('page-transition');
  if (ptOverlay) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
        link.addEventListener('click', e => {
          e.preventDefault();
          ptOverlay.classList.add('pt-enter');
          setTimeout(() => {
            window.location.href = href;
          }, 500);
        });
      }
    });
    window.addEventListener('pageshow', () => {
      ptOverlay.classList.remove('pt-enter');
    });
  }

  // ===== PARALLAX ON SCROLL =====
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = el.dataset.speed || 0.15;
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0 && rect.top < window.innerHeight) {
        el.style.transform = `translateY(${scrolled * speed}px)`;
      }
    });
  });

});

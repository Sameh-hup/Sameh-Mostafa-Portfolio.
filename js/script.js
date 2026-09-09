/**
 * SAMEH MOSTAFA | PORTFOLIO JAVASCRIPT
 * C# / .NET Software Engineer & Database Developer
 * Vanilla ES6+ - Production Quality, Accessible & Performant
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PROJECT CASE STUDY DATA
     ========================================================================== */
  const projectCaseStudies = {
    'bookstore': {
      title: 'Bookstore Order & Inventory Engine',
      overview: 'A comprehensive C# domain-driven order processing and inventory control system with automated financial auditing.',
      challenge: 'Handling complex retail workflows: validating buyer wallet balances, calculating dynamic regional shipping, applying promo codes, preventing out-of-stock orders, and automating refunds upon cancellation.',
      approach: 'Architected a clean Domain Model utilizing OOP encapsulation. Developed dynamic promo engines, automated member tier upgrades (Gold, Silver, Bronze), and managed strict order state lifecycles.',
      technologies: ['C#', '.NET Core', 'OOP', 'Domain Modeling', 'Collections & Lists', 'Financial Auditing'],
      features: [
        'Automated VIP tier badging based on customer wallet balance',
        'Dynamic shipping calculation based on governorates (Cairo, Mansoura, Alex)',
        'Multi-tier promo code engine (READ50, FREESHIP)',
        'Order lifecycle tracking (Pending, Delivered, Cancelled) with atomic refunds',
        'Dynamic inventory stock level triggers (High, Low, Out of Stock)'
      ],
      impact: 'Engineered an automated, zero-error order processing engine with atomic wallet transactions, dynamic discount logic, and robust inventory auditing.',
      github: 'https://github.com/Sameh-hup/Bookstore-Management-System.'
    },
    'library-db': {
      title: 'Library Management System Database',
      overview: 'A normalized relational database system designed for multi-branch book tracking, member borrowing, and fine auditing.',
      challenge: 'Managing intricate relationships between books, authors, physical copies, members, and borrowings while maintaining strict data integrity and zero redundancy.',
      approach: 'Modeled complete ERD schemas normalized to 3NF. Built transactional Stored Procedures with TRY...CATCH error handling, automated audit Triggers, and implemented Non-clustered and Composite Indexes.',
      technologies: ['SQL Server', 'T-SQL', 'ERD Modeling', 'Normalization (3NF)', 'Stored Procedures', 'Triggers', 'Indexes'],
      features: [
        'Normalized schema (3NF) eliminating data redundancy across branches',
        'Transactional stored procedures guaranteeing safe borrowing operations',
        'Automated database triggers to maintain copy status and return dates',
        'Strategic index tuning accelerating complex search queries and reporting',
        'Database views abstracting operational metrics for librarians'
      ],
      impact: 'Eliminated data redundancy, guaranteed transactional integrity for borrowing flows, and achieved lightning-fast report retrieval through optimized SQL indexing.',
      github: 'https://github.com/Sameh-hup/Library-Management-System-Database'
    },
    'smartcity': {
      title: 'SmartCity IoT & Mobility Hub',
      overview: 'An interface-driven C# simulation managing urban smart devices and eco-friendly mobility transit systems.',
      challenge: 'Coordinating heterogeneous smart devices and transit vehicles with dynamic states without creating tightly coupled, fragile code.',
      approach: 'Applied SOLID Interface Segregation principles (IConnectable, ITrackable, IRechargeable, IVoiceControllable) with a centralized telemetry hub tracking device statuses in real time.',
      technologies: ['C#', '.NET', 'OOP', 'Interface Design', 'SOLID Principles'],
      features: [
        'Interface-driven architecture allowing plug-and-play device extensibility',
        'Dynamic telemetry and location tracking for transit fleets',
        'Recharge and battery state simulation for electric vehicles',
        'Centralized SmartCity hub aggregating urban infrastructure metrics'
      ],
      impact: 'Delivered an extensible, decoupled architecture enabling plug-and-play device management with zero regression on core telemetry systems.',
      github: 'https://github.com/Sameh-hup/SmartCity-Management-System.git'
    },
    'lugx-store': {
      title: 'LUGX Gaming E-Commerce Store',
      overview: 'A fast, responsive multi-page gaming e-commerce interface built purely with modern frontend web standards.',
      challenge: 'Creating an engaging, mobile-responsive gaming storefront with dynamic cart interactions without the overhead of heavy JavaScript frameworks.',
      approach: 'Built clean semantic HTML5, modern CSS3 styling with Bootstrap components, and vanilla JavaScript for DOM manipulation and shopping cart state handling.',
      technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap'],
      features: [
        'Client-side cart functionality with interactive item calculations',
        'Dynamic product filtering by gaming categories',
        'Fully responsive layout optimized across mobile, tablet, and desktop',
        'Semantic, accessible markup with fast initial load times'
      ],
      impact: 'Achieved fast load times and a seamless mobile-first shopping experience with active catalog filtering and a live client-side cart.',
      github: 'https://github.com/Sameh-hup/LUGX-Store'
    }
  };

  /* ==========================================================================
     2. THEME MANAGEMENT (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const STORAGE_KEY_THEME = 'sameh_portfolio_theme';

  const applyTheme = (themeName) => {
    if (themeName === 'dark') {
      document.body.classList.add('dark-mode');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        themeToggleBtn.setAttribute('title', 'Switch to light mode');
      }
    } else {
      document.body.classList.remove('dark-mode');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        themeToggleBtn.setAttribute('title', 'Switch to dark mode');
      }
    }
  };

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
  };

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      applyTheme(currentTheme);
      try {
        localStorage.setItem(STORAGE_KEY_THEME, currentTheme);
      } catch (err) {
        console.warn('Unable to write to localStorage:', err);
      }
    });
  }

  prefersDarkScheme.addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (!savedTheme) {
      currentTheme = e.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
    }
  });

  /* ==========================================================================
     3. MOBILE NAVIGATION (HAMBURGER MENU)
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileMenu = () => {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
  };

  const closeMobileMenu = () => {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
  };

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    hamburgerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburgerBtn.click();
      } else if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open')) {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileMenu();
        hamburgerBtn.focus();
      }
    });
  }

  /* ==========================================================================
     4. ACTIVE SCROLLSPY & SMOOTH SCROLLING
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const handleScrollspy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollspy, { passive: true });

  /* ==========================================================================
     5. PROJECT DETAILS MODAL & FOCUS TRAP
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseBottomBtn = document.getElementById('modal-close-bottom-btn');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectBody = document.getElementById('modal-project-body');
  const modalGithubLink = document.getElementById('modal-github-link');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  let lastFocusedElement = null;

  const getFocusableModalElements = () => {
    if (!projectModal) return [];
    return Array.from(
      projectModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  };

  const openProjectModal = (projectId, triggerElement) => {
    const data = projectCaseStudies[projectId];
    if (!data || !projectModal) return;

    lastFocusedElement = triggerElement;

    modalProjectTitle.textContent = data.title;
    modalGithubLink.setAttribute('href', data.github);

    modalProjectBody.innerHTML = `
      <div class="modal-section-block">
        <h4>Overview</h4>
        <p>${data.overview || 'Details will be added.'}</p>
      </div>

      <div class="modal-section-block">
        <h4>Challenge / Purpose</h4>
        <p>${data.challenge || 'Details will be added.'}</p>
      </div>

      <div class="modal-section-block">
        <h4>Technical Approach</h4>
        <p>${data.approach || 'Details will be added.'}</p>
      </div>

      <div class="modal-section-block">
        <h4>Technologies Used</h4>
        <div class="project-tech-tags" style="margin-top: 0.5rem; margin-bottom: 0;">
          ${(data.technologies && data.technologies.length > 0)
            ? data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')
            : '<span class="tech-tag">Details will be added.</span>'
          }
        </div>
      </div>

      <div class="modal-section-block">
        <h4>Key Features</h4>
        ${(data.features && data.features.length > 0)
          ? `<ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>`
          : '<p>Details will be added.</p>'
        }
      </div>

      <div class="modal-section-block">
        <h4>What I Learned</h4>
        <p>${data.learned || 'Details will be added.'}</p>
      </div>
    `;

    projectModal.classList.add('is-active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 50);
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('is-active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  openModalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-project');
      openProjectModal(projectId, e.currentTarget);
    });

    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = e.currentTarget.getAttribute('data-project');
        openProjectModal(projectId, e.currentTarget);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseBottomBtn) modalCloseBottomBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (!projectModal || !projectModal.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeProjectModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = getFocusableModalElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  /* ==========================================================================
     6. PROJECT CATEGORY FILTERING
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. CONTACT FORM SUBMISSION (FORMSUBMIT AJAX API)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  const inputName = document.getElementById('contact-name');
  const inputEmail = document.getElementById('contact-email');
  const inputDesc = document.getElementById('project-description');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const descError = document.getElementById('desc-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorElement, validationFn, errorMessage) => {
    const isValid = validationFn(input.value.trim());
    if (!isValid) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
      return true;
    }
  };

  if (inputName) {
    inputName.addEventListener('blur', () => {
      validateField(inputName, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
    });
    inputName.addEventListener('input', () => {
      if (inputName.classList.contains('is-invalid')) {
        validateField(inputName, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
      }
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('blur', () => {
      validateField(inputEmail, emailError, val => emailRegex.test(val), 'Please provide a valid email address.');
    });
    inputEmail.addEventListener('input', () => {
      if (inputEmail.classList.contains('is-invalid')) {
        validateField(inputEmail, emailError, val => emailRegex.test(val), 'Please provide a valid email address.');
      }
    });
  }

  if (inputDesc) {
    inputDesc.addEventListener('blur', () => {
      validateField(inputDesc, descError, val => val.length >= 10, 'Please enter at least 10 characters describing your project.');
    });
    inputDesc.addEventListener('input', () => {
      if (inputDesc.classList.contains('is-invalid')) {
        validateField(inputDesc, descError, val => val.length >= 10, 'Please enter at least 10 characters describing your project.');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formStatus.hidden = true;
      formStatus.className = 'form-status-banner';
      formStatus.textContent = '';

      const isNameValid = validateField(inputName, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
      const isEmailValid = validateField(inputEmail, emailError, val => emailRegex.test(val), 'Please provide a valid email address.');
      const isDescValid = validateField(inputDesc, descError, val => val.length >= 10, 'Please enter at least 10 characters describing your project.');

      if (!isNameValid || !isEmailValid || !isDescValid) {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const formData = new FormData(contactForm);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      try {
        const response = await fetch('https://formsubmit.co/ajax/sameh57h@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          formStatus.hidden = false;
          formStatus.classList.add('success');
          formStatus.textContent = 'Thank you! Your message has been sent successfully to Sameh Mostafa. You will receive a response shortly.';
          contactForm.reset();
          
          [inputName, inputEmail, inputDesc].forEach(el => {
            el.classList.remove('is-invalid');
            el.removeAttribute('aria-invalid');
          });
        } else {
          throw new Error(data.message || 'Submission was not accepted');
        }
      } catch (err) {
        console.error('Form submission failed:', err);
        formStatus.hidden = false;
        formStatus.classList.add('error');
        formStatus.textContent = 'Unable to send message at this time. Please check your internet connection or email directly at sameh57h@gmail.com.';
      } finally {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }
    });
  }

  /* ==========================================================================
     8. COPY EMAIL TO CLIPBOARD & TOAST NOTIFICATION
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toastNotification = document.getElementById('toast-notification');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toastNotification) return;
    clearTimeout(toastTimeout);
    toastNotification.textContent = message;
    toastNotification.classList.add('is-active');

    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('is-active');
    }, 3000);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'sameh57h@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Email address copied to clipboard!');
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
        showToast('Direct email: sameh57h@gmail.com');
      }
    });
  }

  /* ==========================================================================
     9. FLOATING BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     10. RESILIENT IMAGE FALLBACK HANDLERS
     ========================================================================== */
  const handleImageFallback = (imgElement, containerSelector) => {
    const parentContainer = imgElement.closest(containerSelector);
    if (!parentContainer) return;

    const markFallback = () => {
      parentContainer.classList.add('has-fallback');
    };

    imgElement.addEventListener('error', markFallback);

    if (imgElement.complete && imgElement.naturalWidth === 0) {
      markFallback();
    }
  };

  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    handleImageFallback(profileImg, '.profile-image-container');
  }

  const projectImgs = document.querySelectorAll('.project-img');
  projectImgs.forEach((img) => {
    handleImageFallback(img, '.project-media');
  });

 /* ==========================================================================
     11. SCROLL REVEAL ANIMATIONS (ON SCROLL DOWN & RETURN)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // لما توصل للعنصر وأنت نازل بيظهر
          entry.target.classList.add('active');
        } else {
          // لو العنصر خرج فوق نطاق الرؤية (يعني اتقلب فوق) بيرجع يتحضر للأنميشن اللي بعده
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('active');
          }
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }

  /* ==========================================================================
     12. DYNAMIC FLOATING CODE PARTICLES
     ========================================================================== */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'code-particles-container';
    heroSection.appendChild(particlesContainer);

    const symbols = ['</>', '{ }', 'C#', 'SQL', 'ASP.NET', 'LINQ', '=>', '[ ]', '0101'];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      
      // Random Placement & Speed
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.fontSize = `${14 + Math.random() * 16}px`;
      particle.style.animationDuration = `${10 + Math.random() * 12}s`;
      particle.style.animationDelay = `${Math.random() * 8}s`;

      particlesContainer.appendChild(particle);
    }
  }

});
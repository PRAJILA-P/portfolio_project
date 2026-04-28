/* ==============================
   PORTFOLIO JAVASCRIPT
   Interactive Features:
   - Custom cursor
   - Dark/Light mode toggle
   - Smooth scroll & nav highlight
   - Counter animations
   - Skill bar animations
   - Scroll reveal
   - Project filter
   - Rotating title
   - Mobile menu
   - Contact form validation
   - Typing effect
================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── THEME TOGGLE ─── */
  const html        = document.documentElement;
  const themeBtn    = document.getElementById('themeToggle');
  const savedTheme  = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });


  /* ─── NAVBAR SCROLL & ACTIVE LINK ─── */
  const nav       = document.getElementById('nav');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shrink nav on scroll
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Highlight active section link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-link');
      }
    });
  });

  // Inject active-link style
  const style = document.createElement('style');
  style.textContent = `.nav-link.active-link { color: var(--accent) !important; }`;
  document.head.appendChild(style);


  /* ─── MOBILE MENU ─── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ─── SCROLL REVEAL ─── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ─── COUNTER ANIMATION ─── */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'));
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));


  /* ─── SKILL BARS ─── */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = bar.getAttribute('data-width') + '%';
            }, i * 120);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));


  /* ─── ROTATING TITLE ─── */
const titles = [
  "FastAPI Developer",
    "Django Developer",
    "Python Backend Developer",
  "REST API Specialist",
  "Backend Engineer"
];
  const rotEl = document.getElementById('rotatingTitle');
  let titleIndex = 0;

  function rotateTitle() {
    rotEl.style.opacity = '0';
    rotEl.style.transform = 'translateY(10px)';

    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      rotEl.textContent = titles[titleIndex];
      rotEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      rotEl.style.opacity = '1';
      rotEl.style.transform = 'translateY(0)';
    }, 350);
  }

  setInterval(rotateTitle, 2800);


  /* ─── PROJECT FILTER ─── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');

        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });

      // Fix featured span for backend / api filter
      const featured = document.querySelector('.project-card.featured');
      if (featured && !featured.classList.contains('hidden')) {
        if (filter === 'all' || filter === 'fullstack') {
          featured.style.gridColumn = 'span 2';
        } else {
          featured.style.gridColumn = 'span 1';
        }
      }
    });
  });

  // Inject fadeInUp
  const fadeStyle = document.createElement('style');
  fadeStyle.textContent = `
    @keyframes fadeInUp {
      from { opacity:0; transform: translateY(20px); }
      to   { opacity:1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(fadeStyle);


  /* ─── TIMELINE CLICK ─── */
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      timelineItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });


  /* ─── CONTACT FORM ─── */
  const sendBtn    = document.getElementById('sendBtn');
  const sendLoader = document.getElementById('sendLoader');
  const formSuccess = document.getElementById('formSuccess');
  const contactForm = document.getElementById('contactForm');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name    = document.getElementById('fname');
      const email   = document.getElementById('femail');
      const message = document.getElementById('fmessage');
      let valid = true;

      // Reset errors
      [name, email, message].forEach(f => f.classList.remove('error'));

      if (!name.value.trim()) { name.classList.add('error'); valid = false; }
      if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error'); valid = false; }
      if (!message.value.trim()) { message.classList.add('error'); valid = false; }

      if (!valid) {
        shakeForm();
        return;
      }

      // Simulate sending
      sendBtn.querySelector('span').textContent = 'Sending...';
      sendLoader.classList.remove('hidden');
      sendBtn.disabled = true;

      setTimeout(() => {
        contactForm.innerHTML = '';
        contactForm.appendChild(formSuccess);
        formSuccess.classList.remove('hidden');

        // Animate success
        formSuccess.style.opacity = '0';
        formSuccess.style.transform = 'translateY(20px)';
        formSuccess.style.transition = 'all 0.5s ease';
        requestAnimationFrame(() => {
          formSuccess.style.opacity = '1';
          formSuccess.style.transform = 'translateY(0)';
        });
      }, 1800);
    });
  }

  function shakeForm() {
    const card = document.querySelector('.form-card');
    card.style.animation = 'shake 0.4s ease';
    card.addEventListener('animationend', () => card.style.animation = '', { once: true });
  }

  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-8px); }
      40%      { transform: translateX(8px); }
      60%      { transform: translateX(-5px); }
      80%      { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(shakeStyle);


  /* ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─── TILT ON PROJECT CARDS ─── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * 5;
      const rotY   = ((x - cx) / cx) * -5;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ─── TYPING CURSOR on hero name ─── */
  const heroName = document.querySelector('.hero-name .accent');
  if (heroName) {
    heroName.style.borderRight = '3px solid var(--accent)';
    heroName.style.paddingRight = '4px';
    let visible = true;
    setInterval(() => {
      visible = !visible;
      heroName.style.borderColor = visible ? 'var(--accent)' : 'transparent';
    }, 600);
  }


  /* ─── PARALLAX on blobs ─── */
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    if (blob1) blob1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
    if (blob2) blob2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
  });


  /* ─── ACTIVE NAV UNDERLINE STYLE ─── */
  const linkStyle = document.createElement('style');
  linkStyle.textContent = `
    .nav-link {
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 50%;
      width: 0; height: 2px;
      background: var(--accent);
      border-radius: 2px;
      transform: translateX(-50%);
      transition: width 0.3s ease;
    }
    .nav-link:hover::after,
    .nav-link.active-link::after {
      width: 60%;
    }
  `;
  document.head.appendChild(linkStyle);


  /* ─── PHOTO FRAME UPLOAD HINT ─── */
  const photoFrame = document.querySelector('.photo-frame');
  if (photoFrame) {
    photoFrame.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type  = 'file';
      input.accept = 'image/*';
      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        photoFrame.querySelector('.photo-placeholder').style.display = 'none';
        const img = document.createElement('img');
        img.src = url;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:inherit;';
        photoFrame.appendChild(img);
      };
      input.click();
    });
    photoFrame.style.cursor = 'pointer';
    photoFrame.title = 'Click to upload your photo';
  }

  console.log('%c Portfolio loaded ✓ ', 'background:#00d4ff;color:#000;font-family:monospace;padding:4px 8px;border-radius:4px;');

  /* ── BACK TO TOP BUTTON ── */
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
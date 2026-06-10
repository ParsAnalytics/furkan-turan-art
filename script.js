// ===================================
// FURKAN TURAN ART — JAVASCRIPT
// ===================================

// --- WhatsApp Form Handler ---
// ⚠️ Telefon numaranızı buraya girin (ülke kodu dahil, örn: 905551234567)
const WHATSAPP_NUMBER = '905451927794';

function handleWhatsApp(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const project = document.getElementById('project').value;
  const message = document.getElementById('message').value.trim();

  const text = [
    `Merhaba Furkan Bey,`,
    ``,
    `Adım: ${name}`,
    project ? `Proje Türü: ${project}` : '',
    ``,
    message,
    ``,
    `_(furkanturan.art sitesinden mesaj)_`
  ].filter(l => l !== null).join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Nav Scroll Effect ---
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('span');
    if (menuOpen) {
      bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      bars[1].style.opacity  = '0';
      bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });

  // --- Smooth Scroll with Offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.about-inner > *, .gallery-card, .service-card, .phil-el, .contact-inner > *');
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger by element index within parent group
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = `${delay}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- Gallery Card Tilt Effect ---
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  // --- Service Cards Stagger on Hover (highlight siblings) ---
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      serviceCards.forEach(c => {
        if (c !== card) c.style.opacity = '0.65';
      });
    });
    card.addEventListener('mouseleave', () => {
      serviceCards.forEach(c => { c.style.opacity = ''; });
    });
  });

  // --- Kanji Characters Float Animation ---
  const kanjiSpans = document.querySelectorAll('.about-kanji span');
  kanjiSpans.forEach((span, i) => {
    span.style.animation = `kanjiFloat ${3 + i * 0.5}s ease-in-out infinite alternate`;
    span.style.animationDelay = `${i * 0.4}s`;
  });

  // Inject keyframe if not already present
  if (!document.querySelector('#kanjiAnim')) {
    const style = document.createElement('style');
    style.id = 'kanjiAnim';
    style.textContent = `
      @keyframes kanjiFloat {
        from { transform: translateY(0); opacity: 0.4; }
        to   { transform: translateY(-12px); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }

  // --- Philosophy circles hover pulse ---
  document.querySelectorAll('.phil-circle').forEach(circle => {
    circle.addEventListener('mouseenter', () => {
      circle.style.transform = 'scale(1.1) rotate(10deg)';
      circle.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    circle.addEventListener('mouseleave', () => {
      circle.style.transform = '';
    });
  });

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // Nav link active style
  const navStyle = document.createElement('style');
  navStyle.textContent = `.nav-link.active { color: var(--ink); } .nav-link.active::after { right: 0; }`;
  document.head.appendChild(navStyle);

  // --- City Badge cursor trail (decorative) ---
  document.querySelectorAll('.city-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      badge.style.transform = 'scale(0.93)';
      setTimeout(() => { badge.style.transform = ''; }, 180);
    });
  });

  // --- Page Cursor Glow (subtle) ---
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,198,198,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // --- Particles on hero CTA click (mini confetti) ---
  const heroGalBtn = document.getElementById('hero-gallery-btn');
  if (heroGalBtn) {
    heroGalBtn.addEventListener('click', spawnPetals);
  }

  function spawnPetals() {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: fixed;
        width: ${6 + Math.random() * 10}px;
        height: ${6 + Math.random() * 10}px;
        background: hsl(${330 + Math.random() * 30}, 80%, ${75 + Math.random() * 15}%);
        border-radius: 80% 20% 80% 20% / 20% 80% 20% 80%;
        left: 50%; top: 50%;
        pointer-events: none;
        z-index: 999;
        animation: confettiOut ${0.8 + Math.random() * 0.8}s ease forwards;
        --tx: ${(Math.random() - 0.5) * 300}px;
        --ty: ${(Math.random() - 0.5) * 300}px;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1600);
    }
  }

  if (!document.querySelector('#confettiAnim')) {
    const s = document.createElement('style');
    s.id = 'confettiAnim';
    s.textContent = `
      @keyframes confettiOut {
        from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        to   { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }

  // --- Counter Animation for Hero Stats ---
  const stats = [
    { el: null, target: 58,   suffix: '+' },
    { el: null, target: 4,    suffix: ''  },
    { el: null, target: 6300, suffix: '+' },
  ];
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach((el, i) => {
    if (stats[i]) stats[i].el = el;
  });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(stat => {
          if (!stat.el) return;
          animateCounter(stat.el, stat.target, stat.suffix);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.8 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  function animateCounter(el, target, suffix) {
    const duration = 1400;
    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(update);
  }

  // --- Gallery Expand/Collapse (Load More/Less) ---
  const loadMoreBtn = document.getElementById('gallery-load-more');
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryWrapper = document.getElementById('gallery-wrapper');

  if (loadMoreBtn && galleryGrid && galleryWrapper) {
    loadMoreBtn.addEventListener('click', () => {
      const isExpanded = galleryGrid.classList.contains('expanded');
      
      if (isExpanded) {
        // Scroll smoothly to gallery header before collapsing to prevent losing position
        const target = document.getElementById('gallery');
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({ top, behavior: 'smooth' });

        // Collapse gallery
        galleryGrid.classList.remove('expanded');
        galleryWrapper.classList.remove('expanded');
        loadMoreBtn.textContent = 'Daha Fazla Göster';
      } else {
        // Expand gallery
        galleryGrid.classList.add('expanded');
        galleryWrapper.classList.add('expanded');
        loadMoreBtn.textContent = 'Daha Az Göster';
      }
    });
  }
});

// --- Contact Form Handler ---
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');

  btn.textContent = 'Gönderiliyor...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Gönderildi!';
    btn.style.background = 'linear-gradient(135deg, #B8CDBB, #8FAE92)';
    success.classList.add('show');

    setTimeout(() => {
      document.getElementById('contact-form').reset();
      btn.textContent = 'Mesaj Gönder';
      btn.disabled = false;
      btn.style.background = '';
      success.classList.remove('show');
    }, 4000);
  }, 1200);
}

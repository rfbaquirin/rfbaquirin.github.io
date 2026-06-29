/* ============================================
   RITCHIE BAQUIRIN — Portfolio JS
   Lightbox + Scroll animations + Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.dataset.lightbox;
      const caption = el.dataset.caption || '';
      openLightbox(src, caption);
    });
  });

  /* ---- SCROLL ANIMATIONS ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ---- ACTIVE NAV ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => navObserver.observe(s));

  /* ---- NAV SCROLL STYLE ---- */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40 ? 'var(--border)' : 'var(--border-subtle)';
  });

  /* ---- STAGGER FADE-UPS IN GROUPS ---- */
  document.querySelectorAll('.stagger-group').forEach(group => {
    const children = group.querySelectorAll('.fade-up');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

});

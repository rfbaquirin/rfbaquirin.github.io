/* ============================================
   RITCHIE BAQUIRIN — Portfolio JS
   Compare Lightbox + Scroll + Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     COMPARE LIGHTBOX
     ============================================ */

  const lightbox    = document.getElementById('lightbox');
  const lbSingle    = document.getElementById('lb-single');
  const lbSbs       = document.getElementById('lb-sbs');
  const lbImg       = document.getElementById('lb-img');
  const lbStateTag  = document.getElementById('lb-state-tag');
  const lbCaption   = document.getElementById('lb-caption');
  const lbCounter   = document.getElementById('lb-counter');
  const lbSbsBefore = document.getElementById('lb-sbs-before');
  const lbSbsAfter  = document.getElementById('lb-sbs-after');
  const btnCompare  = document.getElementById('lb-btn-compare');
  const btnSbs      = document.getElementById('lb-btn-sbs');
  const btnPrev     = document.getElementById('lb-prev');
  const btnNext     = document.getElementById('lb-next');
  const btnClose    = document.getElementById('lb-close');

  // State
  let currentGroup   = [];   // array of {before, after, caption} objects
  let currentIndex   = 0;
  let showingAfter   = false;
  let sbsMode        = false;

  // Build paired groups from the DOM
  // Each .cs-work-panel pairs its before-row and after-row thumbs
  function buildGroups(clickedEl) {
    const panel = clickedEl.closest('.cs-work-panel, .gallery-grid');

    // Gallery items — no compare pairs
    if (!panel || panel.classList.contains('gallery-grid')) {
      return [{
        before: clickedEl.dataset.lightbox,
        after: null,
        caption: clickedEl.dataset.caption || ''
      }];
    }

    const beforeRow = panel.querySelector('.ba-strip-row:first-of-type .ba-thumb');
    const beforeThumbs = panel.querySelectorAll('.ba-strip-row:first-of-type .ba-thumb');
    const afterThumbs  = panel.querySelectorAll('.ba-strip-row:last-of-type .ba-thumb');

    // Also include hero images as pair index 0
    const heroWrap = panel.querySelectorAll('.ba-image-wrap');
    const groups = [];

    // Hero pair first if exists
    if (heroWrap.length >= 2) {
      groups.push({
        before:  heroWrap[0].dataset.lightbox,
        after:   heroWrap[1].dataset.lightbox,
        caption: heroWrap[0].dataset.caption || '',
        isHero:  true
      });
    }

    // Thumbnail pairs
    const count = Math.min(beforeThumbs.length, afterThumbs.length);
    for (let i = 0; i < count; i++) {
      groups.push({
        before:  beforeThumbs[i].dataset.lightbox,
        after:   afterThumbs[i].dataset.lightbox,
        caption: beforeThumbs[i].dataset.caption || `Image ${i + 1}`
      });
    }

    return groups;
  }

  function findClickedIndex(clickedEl, groups) {
    const src = clickedEl.dataset.lightbox;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].before === src || groups[i].after === src) {
        return i;
      }
    }
    return 0;
  }

  function renderSingle() {
    lbSingle.style.display = 'flex';
    lbSbs.style.display = 'none';
    sbsMode = false;
    btnSbs.textContent = 'Side by side';

    const pair = currentGroup[currentIndex];
    const src = showingAfter && pair.after ? pair.after : pair.before;

    lbImg.style.opacity = '0';
    lbImg.src = src;
    lbImg.onload = () => { lbImg.style.opacity = '1'; };

    lbStateTag.textContent = showingAfter ? 'After' : 'Before';
    lbStateTag.className = 'lb-state-tag ' + (showingAfter ? 'after' : 'before');

    const hasPair = !!pair.after;
    btnCompare.style.display = hasPair ? 'inline-flex' : 'none';
    btnSbs.style.display = hasPair ? 'inline-flex' : 'none';
    btnCompare.textContent = showingAfter ? 'Original' : 'Compare';

    lbCaption.textContent = pair.caption.replace(/— Before|— After/i, '').trim();
    lbCounter.textContent = `${currentIndex + 1} of ${currentGroup.length}`;

    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === currentGroup.length - 1;
  }

  function renderSbs() {
    sbsMode = true;
    lbSingle.style.display = 'none';
    lbSbs.style.display = 'flex';
    btnSbs.textContent = 'Single view';

    const pair = currentGroup[currentIndex];
    lbSbsBefore.src = pair.before;
    lbSbsAfter.src  = pair.after || pair.before;
    lbCounter.textContent = `${currentIndex + 1} of ${currentGroup.length}`;

    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === currentGroup.length - 1;
  }

  function openLightbox(el) {
    currentGroup  = buildGroups(el);
    currentIndex  = findClickedIndex(el, currentGroup);
    showingAfter  = el.dataset.lightbox === currentGroup[currentIndex]?.after;
    sbsMode       = false;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderSingle();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lbImg.src = '';
      lbSbsBefore.src = '';
      lbSbsAfter.src  = '';
    }, 300);
  }

  // Button events
  btnCompare.addEventListener('click', () => {
    showingAfter = !showingAfter;
    renderSingle();
  });

  btnSbs.addEventListener('click', () => {
    if (sbsMode) { sbsMode = false; renderSingle(); }
    else { renderSbs(); }
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingAfter = false;
      sbsMode ? renderSbs() : renderSingle();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < currentGroup.length - 1) {
      currentIndex++;
      showingAfter = false;
      sbsMode ? renderSbs() : renderSingle();
    }
  });

  btnClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   btnPrev.click();
    if (e.key === 'ArrowRight')  btnNext.click();
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      btnCompare.click();
    }
  });

  // Attach to all clickable elements
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openLightbox(el));
  });


  /* ============================================
     SCROLL ANIMATIONS
     ============================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    const group = el.closest('.stagger-group');
    if (group) {
      const siblings = Array.from(group.querySelectorAll('.fade-up'));
      el.style.transitionDelay = `${siblings.indexOf(el) * 80}ms`;
    }
    observer.observe(el);
  });


  /* ============================================
     ACTIVE NAV
     ============================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => navObserver.observe(s));

  /* NAV scroll border */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40
      ? 'var(--border)'
      : 'var(--border-subtle)';
  });

});

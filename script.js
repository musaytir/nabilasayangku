'use strict';

(() => {
  const config = window.ANNIVERSARY_CONFIG || {};
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const rain = document.getElementById('flower-rain');
  const motionButton = document.getElementById('motion-control');
  const motionLabel = document.getElementById('motion-label');
  const letterDialog = document.getElementById('letter-dialog');
  const photoDialog = document.getElementById('photo-dialog');
  const secretButton = document.getElementById('secret-button');
  const secretMessage = document.getElementById('secret-message');
  const galleryCards = Array.from(document.querySelectorAll('[data-photo]'));
  const photos = galleryCards.map(card => ({
    src: card.querySelector('img').getAttribute('src'),
    alt: card.querySelector('img').alt,
    caption: card.querySelector('.photo-caption > span').textContent
  }));
  let paused = reducedMotion.matches;
  let currentPhoto = 0;
  let lastDialogTrigger = null;
  let hugCount = 0;
  let burstActive = false;

  // textContent keeps names and custom paragraphs safe to edit.
  document.querySelectorAll('[data-partner]').forEach(el => {
    el.textContent = typeof config.namaPasangan === 'string' && config.namaPasangan.trim() ? config.namaPasangan.trim() : 'Sayang';
  });
  document.querySelectorAll('[data-sender]').forEach(el => {
    el.textContent = typeof config.namaPengirim === 'string' && config.namaPengirim.trim() ? config.namaPengirim.trim() : 'Aku';
  });
  if (Array.isArray(config.isiSurat)) {
    const paragraphs = config.isiSurat.filter(text => typeof text === 'string' && text.trim());
    if (paragraphs.length) {
      const body = document.getElementById('letter-body');
      body.replaceChildren(...paragraphs.map(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        return paragraph;
      }));
    }
  }

  // A fixed number of lightweight particles, with no continuously growing DOM.
  function createFlowers() {
    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 760 ? 16 : 26;
    for (let i = 0; i < count; i += 1) {
      const flower = document.createElement('span');
      flower.className = 'falling-flower';
      flower.textContent = i % 5 === 0 ? '🌺' : '🌸';
      flower.style.setProperty('--left', `${Math.random() * 100}%`);
      flower.style.setProperty('--size', `${12 + Math.random() * 15}px`);
      flower.style.setProperty('--duration', `${15 + Math.random() * 14}s`);
      flower.style.setProperty('--delay', `${-Math.random() * 28}s`);
      flower.style.setProperty('--sway', `${Math.random() * 80 - 40}px`);
      flower.style.setProperty('--drift', `${Math.random() * 120 - 60}px`);
      fragment.appendChild(flower);
    }
    rain.replaceChildren(fragment);
  }

  function updateMotion() {
    root.classList.toggle('motion-paused', paused || document.hidden);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionLabel.textContent = reducedMotion.matches ? 'Gerak dikurangi' : paused ? 'Lanjutkan animasi' : 'Jeda animasi';
    motionButton.firstElementChild.textContent = paused ? '▶' : '❚❚';
    motionButton.disabled = reducedMotion.matches;
    motionButton.title = reducedMotion.matches ? 'Mengikuti pengaturan kurangi gerakan pada perangkatmu.' : '';
  }

  motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateMotion(); });
  document.addEventListener('visibilitychange', updateMotion);
  createFlowers();
  updateMotion();

  // Reveal once; content remains readable if IntersectionObserver is unavailable.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }

  function openDialog(dialog, trigger) {
    lastDialogTrigger = trigger;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }

  document.querySelectorAll('.open-letter').forEach(button => {
    button.addEventListener('click', () => openDialog(letterDialog, button));
  });

  [letterDialog, photoDialog].forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    // Native dialog handles Escape and keeps keyboard focus inside the open dialog.
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      if (lastDialogTrigger) lastDialogTrigger.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });

  secretButton.addEventListener('click', () => {
    const willOpen = secretMessage.hidden;
    secretMessage.hidden = !willOpen;
    secretButton.setAttribute('aria-expanded', String(willOpen));
    secretButton.textContent = willOpen ? 'Simpan lagi rahasianya ♡' : 'Satu rahasia lagi… ♡';
    if (willOpen) secretMessage.scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'nearest' });
  });

  function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;
    const selected = photos[currentPhoto];
    const image = document.getElementById('lightbox-image');
    image.src = selected.src;
    image.alt = selected.alt;
    document.getElementById('lightbox-caption').textContent = selected.caption;
    document.getElementById('photo-counter').textContent = `${currentPhoto + 1} / ${photos.length}`;
  }

  galleryCards.forEach((button, index) => {
    button.addEventListener('click', () => { showPhoto(index); openDialog(photoDialog, button); });
  });
  document.getElementById('previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
  document.getElementById('next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
  });
  let touchStart = null;
  photoDialog.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  photoDialog.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  photoDialog.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });

  function flowerBurst(button) {
    if (paused || reducedMotion.matches || burstActive) return;
    burstActive = true;
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 28; i += 1) {
      const flower = document.createElement('span');
      flower.className = 'love-burst';
      flower.setAttribute('aria-hidden', 'true');
      flower.textContent = ['🌸', '♡', '🌺'][i % 3];
      flower.style.color = '#9c2948';
      flower.style.setProperty('--left', `${rect.left + rect.width / 2}px`);
      flower.style.setProperty('--top', `${rect.top + rect.height / 2}px`);
      flower.style.setProperty('--size', `${18 + Math.random() * 18}px`);
      flower.style.setProperty('--dx', `${(Math.random() - 0.5) * Math.min(window.innerWidth, 650)}px`);
      flower.style.setProperty('--dy', `${-100 - Math.random() * 300}px`);
      flower.style.setProperty('--spin', `${Math.random() * 320 - 160}deg`);
      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 2200);
    }
    setTimeout(() => { burstActive = false; }, 2200);
  }

  const hugs = [
    'Peluk balik yang lamaaa. Sampai rindunya sedikit reda. ♡',
    'Kalau layar ini bisa dilewati, aku sudah di sebelahmu sekarang. ♡',
    'Satu lagi? Buat kamu, pelukku nggak pernah habis. ♡'
  ];
  document.getElementById('hug-button').addEventListener('click', event => {
    document.getElementById('hug-response').textContent = hugs[hugCount % hugs.length];
    hugCount += 1;
    flowerBurst(event.currentTarget);
  });
})();

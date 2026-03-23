/* ============================================================
   CHAPTER 0 — PRELUDE
   Logo sequence → fog lift → nav reveal → scroll unlock
   Full sequence: T+0s to T+3.8s (time-based, not scroll)
   ============================================================ */

function runCh0Prelude() {
  const ch0  = document.getElementById('ch0');
  const gnav = document.getElementById('gnav');
  if (!ch0) return;

  // If reduced motion: skip the whole sequence, just reveal immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ch0.style.display = 'none';
    gnav && gnav.classList.add('visible');
    document.body.style.overflow = 'auto';
    return;
  }

  // Lock scroll during prelude
  document.body.style.overflow = 'hidden';

  const logo = ch0.querySelector('.ch0-logo');
  if (logo) {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(16px)';
  }

  const tl = gsap.timeline();

  // T+0.30s — Logo fades in
  tl.to(logo, {
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: 'power2.out',
    delay: 0.30,
  });

  // T+2.20s — Fog lift (white panel sweeps up)
  tl.to(ch0, {
    yPercent: -100,
    duration: 1.6,
    ease: 'power2.inOut',
    delay: 0.75,  // logo fully visible at ~1.15s, lift at 2.20s
  });

  // T+3.25s — Nav slides down
  tl.add(() => {
    gnav && gnav.classList.add('visible');
  }, '-=0.55');

  // T+3.80s — Unlock scroll
  tl.add(() => {
    document.body.style.overflow = 'auto';
    ch0.style.pointerEvents = 'none';
    // Hide ch0 after it's fully off-screen
    setTimeout(() => {
      ch0.style.display = 'none';
    }, 400);
  }, '+=0.00');
}

/* Nav scroll state */
function initNavScrollState() {
  const gnav = document.getElementById('gnav');
  if (!gnav) return;

  let ticking = false;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const progress = window.scrollY / totalHeight;
        if (progress > 0.04) {
          gnav.classList.add('scrolled');
        } else {
          gnav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

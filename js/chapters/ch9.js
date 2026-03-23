/* ============================================================
   CHAPTER 9 — THE STARS (FOOTER)
   180vh. Camera tilts upward. Stars. Footer floats in stars.
   "Clem had a good day." — the final line.
   ============================================================ */

function initCh9() {
  const ch9 = document.getElementById('ch9');
  if (!ch9) return;

  _ch9_buildStarfield();
  _ch9_scrollTimeline();
}

/* ── Build star field ────────────────────────────────────── */

function _ch9_buildStarfield() {
  const sf = document.getElementById('ch9-starfield');
  if (!sf) return;

  // Denser stars than Ch7 (20 more)
  const stars = Array.from({length:80}, (_, i) => {
    const x = Math.random() * 1440;
    const y = Math.random() * 900;
    const r = 0.8 + Math.random() * 2.5;
    const cls = i % 5 === 0 ? 'star star-warm' : 'star';
    return `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
  }).join('');

  sf.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style="position:absolute;inset:0;width:100%;height:100%;">
    <rect width="1440" height="900" fill="#0D0B1E"/>
    <rect width="1440" height="400" fill="#070614"/>
    <g>${stars}</g>
  </svg>`;

  // Register starfield with parallax (cursor makes stars shift gently)
  const parallax = getParallax();
  if (parallax) parallax.addLayer(sf, 7, 4);
}

/* ── Scroll timeline ─────────────────────────────────────── */

function _ch9_scrollTimeline() {
  const ch9   = document.getElementById('ch9');
  const scene = document.getElementById('ch9-scene');
  const fLogo = document.querySelector('.footer-logo');
  const fDiv1 = document.querySelectorAll('.footer-divider')[0];
  const fDiv2 = document.querySelectorAll('.footer-divider')[1];
  const fLinks = document.querySelector('.footer-links');
  const fBot  = document.querySelector('.footer-bottom');
  const final = document.getElementById('final-line');

  // Camera tilt: scene slides down as we scroll (camera tilts up)
  // Rate: 1:1.8 scroll-to-translateY ratio
  ScrollTrigger.create({
    trigger: ch9,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p = self.progress;
      if (scene) gsap.set(scene, { y: -p * (ch9.offsetHeight - window.innerHeight) * 1.8 });
    }
  });

  // Footer content staggered fade-in — like stars appearing
  const elements = [fLogo, fDiv1, fLinks, fDiv2, fBot, final].filter(Boolean);

  elements.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: ch9,
      start: `${20 + i * 8}% bottom`,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.08,
        });
      },
      once: true,
    });
  });

  // "Clem had a good day." — the final line
  // Only reveals when user truly scrolls to the very bottom
  if (final) {
    ScrollTrigger.create({
      trigger: final,
      start: 'top 95%',
      onEnter: () => {
        gsap.to(final, { opacity: 0.35, duration: 1.2, ease: 'power1.in' });
      },
      once: true,
    });
  }
}

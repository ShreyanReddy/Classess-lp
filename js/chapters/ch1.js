/* ============================================================
   CHAPTER 1 — HAWAIIAN SUNRISE
   380vh sticky. 8 SVG parallax layers. Scroll effects.
   ============================================================ */

function initCh1() {
  const ch1 = document.getElementById('ch1');
  if (!ch1) return;

  _ch1_injectSVGs();
  _ch1_injectClem();
  _ch1_registerParallax();
  _ch1_scrollEffects();
  initNavScrollState();
}

/* ── Inject SVG files into layer divs ─────────────────────── */

function _ch1_injectSVGs() {
  const svgMap = {
    'l-sky':    'svg/scenes/ch1-sky.svg',
    'l-clouds': 'svg/scenes/ch1-clouds.svg',
    'l-mf':     'svg/scenes/ch1-mtn-far.svg',
    'l-mm':     'svg/scenes/ch1-mtn-mid.svg',
    'l-hills':  'svg/scenes/ch1-hills.svg',
    'l-ground': 'svg/scenes/ch1-ground.svg',
    'l-trees':  'svg/scenes/ch1-trees.svg',
    'l-fg':     'svg/scenes/ch1-foreground.svg',
  };

  Object.entries(svgMap).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(r => r.text())
      .then(svgText => {
        el.innerHTML = svgText;
        // Ensure SVG fills the layer
        const svg = el.querySelector('svg');
        if (svg) {
          svg.style.position = 'absolute';
          svg.style.top = '0';
          svg.style.left = '0';
          svg.style.width = '100%';
          svg.style.height = '100%';
        }
      })
      .catch(() => {});
  });
}

/* ── Inject inline Clem SVG into ch1 container ─────────────── */

function _ch1_injectClem() {
  const container = document.getElementById('clem-ch1');
  if (!container) return;
  fetch('svg/characters/clem.svg')
    .then(r => r.text())
    .then(svgText => {
      container.innerHTML = svgText;
    })
    .catch(() => {});
}

/* ── Register all 8 layers with ParallaxController ────────── */

function _ch1_registerParallax() {
  // Layer parallax factors from spec table
  const layerDefs = [
    { id: 'l-sky',    xFactor:   7, yFactor:  4 },
    { id: 'l-clouds', xFactor:  14, yFactor:  6 },
    { id: 'l-mf',     xFactor:  22, yFactor: 11 },
    { id: 'l-mm',     xFactor:  36, yFactor: 18 },
    { id: 'l-hills',  xFactor:  50, yFactor: 25 },
    { id: 'l-ground', xFactor:  65, yFactor: 30 },
    { id: 'l-trees',  xFactor:  82, yFactor: 38 },
    { id: 'l-fg',     xFactor: 100, yFactor: 46 },
  ];

  const parallax = getParallax();
  layerDefs.forEach(def => {
    const el = document.getElementById(def.id);
    if (el) parallax.addLayer(el, def.xFactor, def.yFactor);
  });
}

/* ── Scroll effects tied to scroll progress ─────────────────── */

function _ch1_scrollEffects() {
  const ch1   = document.getElementById('ch1');
  const gnav  = document.getElementById('gnav');
  if (!ch1) return;

  // Sun Y movement (+55px as we scroll through ch1)
  // Stars fade out over first 50%
  // These are tied to ScrollTrigger scroll progress

  ScrollTrigger.create({
    trigger: ch1,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p = self.progress; // 0→1

      // Move sun upward (55px travel)
      const sunEl = document.getElementById('ch1-sun');
      if (sunEl) {
        gsap.set(sunEl, { y: -p * 55 });
      }

      // Fade stars out in first 50%
      const stars = document.querySelector('.ch1-stars');
      if (stars) {
        stars.style.opacity = Math.max(0, 1 - p * 2);
      }

      // Nav scrolled state at 4% progress
      if (gnav) {
        if (p > 0.04) gnav.classList.add('scrolled');
        else gnav.classList.remove('scrolled');
      }

      // Brighten arcs slightly as sun rises (filter on sky layer)
      const sky = document.getElementById('l-sky');
      if (sky) {
        const brightness = 1 + p * 0.12;
        sky.style.filter = `brightness(${brightness})`;
      }
    }
  });
}

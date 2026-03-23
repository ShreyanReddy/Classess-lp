/* ============================================================
   CLASSESS AI — MAIN ENTRY POINT
   Init sequence: performance → fonts → lenis → cursor →
                  parallax → particles → scroll engine
   ============================================================ */

/* ── Performance Tier Detection ──────────────────────────────── */

function detectPerformanceTier() {
  const cores  = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 2;

  if (cores >= 8 && memory >= 8)  return 'high';
  if (cores >= 4 && memory >= 4)  return 'medium';
  return 'low';
}

// Mobile always medium (battery/thermals)
function getActualTier() {
  if (window.matchMedia('(pointer: coarse)').matches) return 'medium';
  return detectPerformanceTier();
}

/* ── Loader Line ─────────────────────────────────────────────── */

function startLoader() {
  const line = document.getElementById('loader-line');
  if (!line) return;
  requestAnimationFrame(() => line.classList.add('loaded'));
}

/* ── Scroll Hint ─────────────────────────────────────────────── */

function showScrollHint() {
  const hint = document.getElementById('scroll-hint');
  if (!hint) return;

  // Show after fog lift + 1s
  setTimeout(() => {
    hint.classList.add('visible');
    // Auto-hide after 8s
    setTimeout(() => {
      hint.classList.remove('visible');
      hint.classList.add('hidden');
    }, 8000);
  }, 3800 + 1000);

  // Also hide on first scroll
  window.addEventListener('scroll', () => {
    hint.classList.remove('visible');
    hint.classList.add('hidden');
  }, { once: true });
}

/* ── Reduced Motion Check ────────────────────────────────────── */

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ── Main Init ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const tier = getActualTier();

  // 1. Loader line
  startLoader();

  // 2. Smooth scroll
  if (!prefersReducedMotion()) {
    initLenis();
  } else {
    // Still need ScrollTrigger to work without Lenis
    gsap.registerPlugin(ScrollTrigger);
    document.body.style.overflow = 'auto';
  }

  // 3. Cursor (desktop only)
  initCursor();

  // 4. Parallax (skip for reduced motion)
  if (!prefersReducedMotion()) {
    getParallax();
  }

  // 5. Particle engine
  if (!prefersReducedMotion()) {
    initParticles(tier);
  }

  // 6. Scroll engine (all chapters)
  // Wait for fonts before kicking off animations
  document.fonts.ready.then(() => {
    // Chapter 0 prelude always runs (time-based, not scroll)
    runCh0Prelude();

    if (!prefersReducedMotion()) {
      initScrollEngine();
    } else {
      // Reduced motion: just show content statically
      document.body.style.overflow = 'auto';
    }

    // Nav scroll state always active
    initNavScrollState();
  });

  // 7. Scroll hint
  showScrollHint();
});

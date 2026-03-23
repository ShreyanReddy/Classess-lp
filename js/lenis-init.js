/* ============================================================
   CLASSESS AI — LENIS SMOOTH SCROLL INIT
   ============================================================ */

let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ticker
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

function getLenis() {
  return lenis;
}

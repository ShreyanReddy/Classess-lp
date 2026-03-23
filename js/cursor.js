/* ============================================================
   CLASSESS AI — CUSTOM CURSOR
   Dot (#cur) + ring (#cur-ring) with lag
   ============================================================ */

function initCursor() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX;
  let ringY  = mouseY;
  const LERP = 0.11;

  // Dot follows exactly
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Ring lags behind
  function tickRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tickRing);
  }
  tickRing();

  // Hover states
  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, .gnav-cta');
    const card = e.target.closest('.feature-card, .data-card');
    const clem = e.target.closest('#clem-ch1');

    ring.classList.remove('hover-link', 'hover-card', 'hover-clem');

    if (clem)       ring.classList.add('hover-clem');
    else if (card)  ring.classList.add('hover-card');
    else if (t)     ring.classList.add('hover-link');
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

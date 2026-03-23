/* ============================================================
   CLASSESS AI — SCROLL ENGINE
   GSAP ScrollTrigger orchestration for all chapters
   ============================================================ */

function initScrollEngine() {
  gsap.registerPlugin(ScrollTrigger);

  // Sync Lenis with ScrollTrigger
  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // Initialize all chapters in sequence
  // (ch0 / runCh0Prelude called separately from main.js before font load)
  initCh1();
  initCh2();
  initCh3();
  if (typeof initCh3to4 === 'function') initCh3to4();
  initCh4();
  initCh5();
  initCh6();
  initCh7();
  initCh8();
  initCh9();
}

// ── Utility: create a scroll-linked timeline ─────────────────

function makeScrollTimeline(trigger, start, end, scrub, onUpdate) {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: scrub || 1,
      onUpdate,
    }
  });
}

// ── Utility: fade in element on scroll entry ─────────────────

function scrollFadeIn(el, trigger, startOffset) {
  gsap.fromTo(el,
    { opacity: 0, y: 16 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger || el,
        start: startOffset || 'top 75%',
        toggleActions: 'play none none reverse',
      }
    }
  );
}

// ── Utility: show feature card ────────────────────────────────

function showFeatureCard(card, trigger, start) {
  if (!card) return;
  gsap.fromTo(card,
    { opacity: 0, y: 12 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power2.out',
      onComplete: () => card.classList.add('visible'),
      scrollTrigger: {
        trigger,
        start: start || 'top 60%',
        toggleActions: 'play none none reverse',
        onLeaveBack: () => {
          card.classList.remove('visible');
          gsap.to(card, { opacity: 0, y: 12, duration: 0.4 });
        }
      }
    }
  );
}

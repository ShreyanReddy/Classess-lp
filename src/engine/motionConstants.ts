export const MOTION = {
  // Scale — never exceed 1.15x
  MAX_SCALE_DELTA: 1.15,

  // Parallax ratios (multiplier on total layer travel)
  PARALLAX: {
    BACKGROUND: 0.15, // slowest — sky, distant horizon
    MIDGROUND:  0.35, // medium — clouds, mountains
    FOREGROUND: 0.60, // fast — near elements
    CHARACTER:  1.00, // matches scroll exactly
    UI:         0.00, // fixed — glass panels stay put
  },

  // GSAP ease strings — single standard for each use case
  EASE: {
    STANDARD:  'power2.inOut',  // default transitions
    ENTRANCE:  'power3.out',    // elements entering the scene
    EXIT:      'power2.in',     // elements leaving
    CINEMATIC: 'expo.out',      // dramatic reveals (sun, mountains)
    SPRING:    'back.out(1.2)', // subtle spring for UI
  },

  // Fade durations as fraction of chapter timeline range
  FADE: {
    IN:  0.08,
    OUT: 0.06,
  },

  // Stagger timing as fraction of chapter timeline range
  STAGGER: {
    TEXT_LINES: 0.04,
    ICONS:      0.06,
    CARDS:      0.08,
  },

  // Text entrance choreography
  TEXT: {
    Y_OFFSET:      24,   // px — slides up from this offset
    OPACITY_START:  0,
    DURATION:      0.10, // fraction of chapter range per text element
  },

  // Z-index layer system
  Z: {
    BACKGROUND: 10,
    MIDGROUND:  20,
    FOREGROUND: 30,
    CHARACTER:  40,
    UI:         50,
    NAV:        100,
    OVERLAY:    200,
  },

  // Scrub lag (seconds) — cinematic feel
  SCRUB_DESKTOP: 1,
  SCRUB_MOBILE:  0.5,

  // Mobile breakpoint
  MOBILE_BREAKPOINT: 768,
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < MOTION.MOBILE_BREAKPOINT
}

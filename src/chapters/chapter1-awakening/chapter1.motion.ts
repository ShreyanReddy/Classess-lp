import gsap from 'gsap'
import type { ChapterLayerRefs, TimelineRange } from '@/engine/types'
import { MOTION } from '@/engine/motionConstants'

export interface Chapter1ExtendedRefs extends ChapterLayerRefs {
  introPanelRef?: { current: HTMLDivElement | null }
  cloudsRef?: { current: HTMLDivElement | null }
  mountainsRef?: { current: HTMLDivElement | null }
  sunRef?: { current: HTMLDivElement | null }
  foregroundGrassRef?: { current: HTMLDivElement | null }
}

/**
 * Maps a chapter-local fraction [0,1] to an absolute master timeline position.
 */
function at(localFraction: number, range: TimelineRange): number {
  return range.start + localFraction * (range.end - range.start)
}

export function buildChapter1Timeline(
  tl: gsap.core.Timeline,
  refs: Chapter1ExtendedRefs,
  range: TimelineRange
): void {
  const { background, midground, foreground } = refs
  const dur = range.end - range.start

  // ── 1. Intro glass panel fades out (local 0.00 → 0.15) ───────────────────
  if (refs.introPanelRef?.current) {
    tl.to(refs.introPanelRef.current, {
      opacity: 0,
      y: -20,
      ease: MOTION.EASE.EXIT,
      duration: dur * 0.15,
    }, at(0, range))
  }

  // ── 2. Sky camera push — subtle scale (local 0.03 → 0.40) ────────────────
  if (background?.current) {
    tl.fromTo(background.current,
      { scale: 1.0 },
      {
        scale: MOTION.MAX_SCALE_DELTA,
        ease: MOTION.EASE.STANDARD,
        duration: dur * 0.37,
      },
      at(0.03, range)
    )
  }

  // ── 3. Clouds lift upward (local 0.05 → 0.50) ────────────────────────────
  if (refs.cloudsRef?.current) {
    tl.to(refs.cloudsRef.current, {
      y: -60,
      ease: MOTION.EASE.STANDARD,
      duration: dur * 0.45,
    }, at(0.05, range))
  }

  // ── 4. Mountains emerge from below (local 0.08 → 0.55) ───────────────────
  if (refs.mountainsRef?.current) {
    tl.fromTo(refs.mountainsRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        ease: MOTION.EASE.CINEMATIC,
        duration: dur * 0.47,
      },
      at(0.08, range)
    )
  }

  // ── 5. Sun reveals (local 0.12 → 0.60) ───────────────────────────────────
  if (refs.sunRef?.current) {
    tl.fromTo(refs.sunRef.current,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 1,
        scale: 1.0,
        ease: MOTION.EASE.CINEMATIC,
        duration: dur * 0.48,
        transformOrigin: 'center 80%',
      },
      at(0.12, range)
    )
  }

  // ── 6. Midground continuous parallax drift (local 0.00 → 1.00) ───────────
  if (midground?.current) {
    tl.to(midground.current, {
      y: -(100 * MOTION.PARALLAX.MIDGROUND),
      ease: 'none',
      duration: dur,
    }, at(0, range))
  }

  // ── 7. Foreground parallax drift (local 0.00 → 1.00) ─────────────────────
  if (foreground?.current) {
    tl.to(foreground.current, {
      y: -(100 * MOTION.PARALLAX.FOREGROUND),
      ease: 'none',
      duration: dur,
    }, at(0, range))
  }

  // ── 8. Nav fades in (local 0.55 → 0.75) ──────────────────────────────────
  const navEl = document.querySelector('[data-nav]') as HTMLElement | null
  if (navEl) {
    tl.fromTo(navEl,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        ease: MOTION.EASE.ENTRANCE,
        duration: dur * 0.20,
      },
      at(0.55, range)
    )
  }

  // ── 9. Foreground grass appears (local 0.65 → 0.85) ──────────────────────
  if (refs.foregroundGrassRef?.current) {
    tl.fromTo(refs.foregroundGrassRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: MOTION.EASE.ENTRANCE,
        duration: dur * 0.20,
      },
      at(0.65, range)
    )
  }

  // ── 10. Chapter exit fade (local 0.88 → 1.00) ────────────────────────────
  const exitTargets = [background?.current, midground?.current, foreground?.current].filter(Boolean)
  if (exitTargets.length > 0) {
    tl.to(exitTargets, {
      opacity: 0,
      ease: MOTION.EASE.EXIT,
      duration: dur * 0.12,
    }, at(0.88, range))
  }
}

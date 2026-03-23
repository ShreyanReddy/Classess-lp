import type { RefObject } from 'react'

export interface ChapterLayerRefs {
  background: RefObject<HTMLDivElement | null>
  midground: RefObject<HTMLDivElement | null>
  foreground: RefObject<HTMLDivElement | null>
  character?: RefObject<HTMLDivElement | null>
  ui: RefObject<HTMLDivElement | null>
}

export interface TimelineRange {
  start: number // 0.0 – 1.0
  end: number   // 0.0 – 1.0
}

export interface ChapterConfig {
  id: string
  scrollWeight: number // vh units (e.g. 300 = 300vh)
  refs: ChapterLayerRefs
  buildTimeline: (
    tl: gsap.core.Timeline,
    refs: ChapterLayerRefs,
    range: TimelineRange
  ) => void
}

export interface ScrollEngineConfig {
  containerId: string
  pinTargetId: string
  chapters: ChapterConfig[]
}

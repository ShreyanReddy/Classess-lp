'use client'

import { useRef } from 'react'
import Nav from './Nav'
import { Chapter1 } from '@/chapters'
import type { Chapter1Handle } from '@/chapters/chapter1-awakening/Chapter1'
import { buildChapter1Timeline } from '@/chapters'
import { useScrollEngine } from '@/hooks/useScrollEngine'
import type { ChapterConfig } from '@/engine/types'

const CONTAINER_ID = 'scroll-container'
const PIN_TARGET_ID = 'pin-target'

export default function HomepageExperience() {
  const chapter1Ref = useRef<Chapter1Handle>(null)

  useScrollEngine({
    containerId: CONTAINER_ID,
    pinTargetId: PIN_TARGET_ID,
    getChapters: (): ChapterConfig[] => {
      const ch1 = chapter1Ref.current
      if (!ch1) return []

      return [
        {
          id: 'chapter-1-awakening',
          scrollWeight: 300,
          refs: ch1.refs,
          buildTimeline: (tl, refs, range) => {
            buildChapter1Timeline(tl, {
              ...refs,
              introPanelRef: ch1.introPanelRef,
              cloudsRef: ch1.cloudsRef,
              mountainsRef: ch1.mountainsRef,
              sunRef: ch1.sunRef,
              foregroundGrassRef: ch1.foregroundGrassRef,
            }, range)
          },
        },
      ]
    },
  })

  return (
    <main
      id={CONTAINER_ID}
      className="relative w-full"
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport — the cinematic stage */}
      <div
        id={PIN_TARGET_ID}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        {/* Chapter layers — stacked absolutely within relative container */}
        <div className="relative w-full h-full">
          <Chapter1 ref={chapter1Ref} />
        </div>

        {/* Global Nav — rendered above all chapter layers */}
        <Nav />
      </div>
    </main>
  )
}

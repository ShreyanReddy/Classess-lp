'use client'

import { forwardRef, useRef, useImperativeHandle } from 'react'
import Image from 'next/image'
import GlassPanel from '@/components/GlassPanel'
import type { ChapterLayerRefs } from '@/engine/types'

export interface Chapter1Handle {
  refs: ChapterLayerRefs
  introPanelRef: React.RefObject<HTMLDivElement | null>
  cloudsRef: React.RefObject<HTMLDivElement | null>
  mountainsRef: React.RefObject<HTMLDivElement | null>
  sunRef: React.RefObject<HTMLDivElement | null>
  foregroundGrassRef: React.RefObject<HTMLDivElement | null>
}

const Chapter1 = forwardRef<Chapter1Handle>((_, ref) => {
  const background = useRef<HTMLDivElement>(null)
  const midground = useRef<HTMLDivElement>(null)
  const foreground = useRef<HTMLDivElement>(null)
  const ui = useRef<HTMLDivElement>(null)

  const introPanelRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const mountainsRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const foregroundGrassRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    refs: { background, midground, foreground, ui },
    introPanelRef,
    cloudsRef,
    mountainsRef,
    sunRef,
    foregroundGrassRef,
  }))

  return (
    <div className="chapter-wrapper absolute inset-0" aria-label="Chapter 1: Awakening">
      {/* Background — Sky */}
      <div ref={background} className="layer layer-background">
        <Image
          src="/assets/chapter1/sky.svg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Midground — Clouds + Mountains */}
      <div ref={midground} className="layer layer-midground">
        <div ref={cloudsRef} className="absolute inset-0">
          <Image
            src="/assets/chapter1/clouds.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div ref={mountainsRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <Image
            src="/assets/chapter1/mountains.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Foreground — Sun + Grass */}
      <div ref={foreground} className="layer layer-foreground">
        <div ref={sunRef} className="absolute inset-0" style={{ opacity: 0, transform: 'scale(0.6)' }}>
          <Image
            src="/assets/chapter1/sun.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div ref={foregroundGrassRef} className="absolute inset-0" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <Image
            src="/assets/chapter1/foreground.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* UI — Intro glass panel */}
      <div ref={ui} className="layer layer-ui">
        <div
          ref={introPanelRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <GlassPanel variant="lg" className="max-w-2xl w-full p-10 text-center">
            <p className="text-white/50 text-sm uppercase tracking-widest mb-4 font-medium">
              Introducing
            </p>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              The classroom,<br />reimagined.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Scroll to experience the future of education.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
              <span>↓</span>
              <span>Scroll to begin</span>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
})

Chapter1.displayName = 'Chapter1'
export default Chapter1

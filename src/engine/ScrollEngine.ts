import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ScrollEngineConfig, TimelineRange } from './types'
import { MOTION, isMobile } from './motionConstants'

gsap.registerPlugin(ScrollTrigger)

// Disable lag smoothing for consistent cinematic scrub
gsap.ticker.lagSmoothing(0)

class ScrollEngineClass {
  private config: ScrollEngineConfig | null = null
  private masterTl: gsap.core.Timeline | null = null
  private scrollTrigger: ScrollTrigger | null = null
  private resizeTimer: ReturnType<typeof setTimeout> | null = null

  init(config: ScrollEngineConfig): void {
    this.destroy()
    this.config = config

    this.buildMasterTimeline()
    this.setupScrollTrigger()
    this.setupResizeHandler()
  }

  private getTotalScrollWeight(): number {
    if (!this.config) return 0
    const total = this.config.chapters.reduce((sum, ch) => sum + ch.scrollWeight, 0)
    return isMobile() ? total * 0.7 : total
  }

  private getChapterRanges(): Map<string, TimelineRange> {
    if (!this.config) return new Map()
    const total = this.config.chapters.reduce((sum, ch) => sum + ch.scrollWeight, 0)
    const ranges = new Map<string, TimelineRange>()
    let cumulative = 0

    for (const chapter of this.config.chapters) {
      const start = cumulative / total
      const end = (cumulative + chapter.scrollWeight) / total
      ranges.set(chapter.id, { start, end })
      cumulative += chapter.scrollWeight
    }

    return ranges
  }

  private buildMasterTimeline(): void {
    if (!this.config) return

    this.masterTl = gsap.timeline({ paused: true })
    const ranges = this.getChapterRanges()

    for (const chapter of this.config.chapters) {
      const range = ranges.get(chapter.id)!
      chapter.buildTimeline(this.masterTl, chapter.refs, range)
    }
  }

  private setupScrollTrigger(): void {
    if (!this.config || !this.masterTl) return

    const container = document.getElementById(this.config.containerId)
    if (!container) {
      console.warn('[ScrollEngine] Container not found:', this.config.containerId)
      return
    }

    const totalVh = this.getTotalScrollWeight()
    container.style.height = `${totalVh}vh`

    const scrub = isMobile() ? MOTION.SCRUB_MOBILE : MOTION.SCRUB_DESKTOP

    this.scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub,
      onUpdate: (self) => {
        this.masterTl?.progress(self.progress)
      },
    })
  }

  private setupResizeHandler(): void {
    const handler = () => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.recalculate(), 200)
    }
    window.addEventListener('resize', handler)
  }

  recalculate(): void {
    if (!this.config) return

    // Re-set container height for new viewport size
    const container = document.getElementById(this.config.containerId)
    if (container) {
      const totalVh = this.getTotalScrollWeight()
      container.style.height = `${totalVh}vh`
    }

    // Rebuild timeline with fresh refs
    this.masterTl?.kill()
    this.buildMasterTimeline()

    // Re-sync scroll position
    ScrollTrigger.refresh()
  }

  destroy(): void {
    this.scrollTrigger?.kill()
    this.masterTl?.kill()
    this.scrollTrigger = null
    this.masterTl = null
    this.config = null
    if (this.resizeTimer) clearTimeout(this.resizeTimer)
  }
}

export const ScrollEngine = new ScrollEngineClass()

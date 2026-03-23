'use client'

import { useEffect } from 'react'
import { ScrollEngine } from '@/engine/ScrollEngine'
import type { ChapterConfig } from '@/engine/types'

interface UseScrollEngineOptions {
  containerId: string
  pinTargetId: string
  // Factory called inside useEffect when refs are populated
  getChapters: () => ChapterConfig[]
}

export function useScrollEngine({ containerId, pinTargetId, getChapters }: UseScrollEngineOptions): void {
  useEffect(() => {
    const chapters = getChapters()
    if (chapters.length === 0) {
      console.warn('[useScrollEngine] No chapters returned — refs may not be ready.')
      return
    }

    ScrollEngine.init({ containerId, pinTargetId, chapters })
    return () => ScrollEngine.destroy()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

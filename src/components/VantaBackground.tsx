'use client'

import { useEffect, useRef } from 'react'
import { useBg } from '@/lib/BgContext'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function VantaBackground() {
  const { bg } = useBg()
  const containerRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Distruggi eventuale effetto Vanta precedente
    if (effectRef.current) {
      effectRef.current.destroy()
      effectRef.current = null
    }

    // Rimuovi eventuale video precedente
    const existing = containerRef.current.querySelector('video')
    if (existing) existing.remove()

    if (bg === 'none') return

    if (bg === 'waves' || bg === 'forest' || bg === 'universe') {
      const video = document.createElement('video')
      const srcMap: Record<string, string> = { waves: '/bg-waves.mp4', forest: '/bg-forest.mp4', universe: '/bg-universe.mp4' }
      video.src = srcMap[bg]
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      Object.assign(video.style, {
        position: 'absolute', inset: '0',
        width: '100%', height: '100%',
        objectFit: 'cover',
        opacity: '0.55',
      })
      containerRef.current!.appendChild(video)
      return
    }

    return () => {
      if (effectRef.current) { effectRef.current.destroy(); effectRef.current = null }
    }
  }, [bg])

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

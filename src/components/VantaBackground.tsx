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

    if (bg === 'waves') {
      const video = document.createElement('video')
      video.src = '/bg-waves.mp4'
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

    async function initVanta() {
      const THREE = await import('three' as any)
      function resolve(mod: any) { return mod?.default ?? mod }

      if (bg === 'birds') {
        const BIRDS = resolve(await import('vanta/dist/vanta.birds.min' as any))
        effectRef.current = BIRDS({
          el: containerRef.current, THREE,
          mouseControls: false, touchControls: false,
          backgroundColor: 0x1a3a5c,
          color1: 0x111111,
          color2: 0x222222,
          birdSize: 1.0, wingSpan: 25, speedLimit: 4,
          separation: 70, alignment: 60, cohesion: 50, quantity: 5,
        })
      } else if (bg === 'fog') {
        const FOG = resolve(await import('vanta/dist/vanta.fog.min' as any))
        effectRef.current = FOG({
          el: containerRef.current, THREE,
          mouseControls: false, touchControls: false,
          highlightColor: 0xc4783a,
          midtoneColor: 0x1a2a4a,
          lowlightColor: 0x050a14,
          baseColor: 0x070d1a,
          blurFactor: 0.6, speed: 1.2, zoom: 0.8,
        })
      }
    }

    initVanta()

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

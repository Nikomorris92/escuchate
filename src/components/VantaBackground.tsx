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

    async function init() {
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
      if (bg === 'none') return

      const THREE = await import('three' as any)
      let VANTA: any

      if (bg === 'waves') {
        VANTA = (await import('vanta/dist/vanta.waves.min' as any)).default
        effectRef.current = VANTA({
          el: containerRef.current, THREE,
          mouseControls: true, touchControls: true,
          color: 0x0a1628,
          shininess: 35, waveHeight: 18, waveSpeed: 0.6, zoom: 0.85,
        })
      } else if (bg === 'stars') {
        VANTA = (await import('vanta/dist/vanta.halo.min' as any)).default
        effectRef.current = VANTA({
          el: containerRef.current, THREE,
          mouseControls: true, touchControls: true,
          backgroundColor: 0x050a14,
          baseColor: 0xc4783a,
          size: 1.5, amplitudeFactor: 1.2,
        })
      } else if (bg === 'birds') {
        VANTA = (await import('vanta/dist/vanta.birds.min' as any)).default
        effectRef.current = VANTA({
          el: containerRef.current, THREE,
          mouseControls: true, touchControls: true,
          backgroundColor: 0x07111f,
          color1: 0xc4783a, color2: 0x3a5fc4,
          birdSize: 1.2, wingSpan: 28, speedLimit: 4,
          separation: 60, alignment: 40, cohesion: 40, quantity: 3,
        })
      } else if (bg === 'fog') {
        VANTA = (await import('vanta/dist/vanta.fog.min' as any)).default
        effectRef.current = VANTA({
          el: containerRef.current, THREE,
          mouseControls: true, touchControls: true,
          highlightColor: 0xc4783a,
          midtoneColor: 0x1a2a4a,
          lowlightColor: 0x050a14,
          baseColor: 0x070d1a,
          blurFactor: 0.6, speed: 1.2, zoom: 0.8,
        })
      }
    }

    init()

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

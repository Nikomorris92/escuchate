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

      function resolve(mod: any) { return mod?.default ?? mod }

      if (bg === 'waves') {
        const WAVES = resolve(await import('vanta/dist/vanta.waves.min' as any))
        effectRef.current = WAVES({
          el: containerRef.current, THREE,
          mouseControls: false, touchControls: false,
          color: 0x005f7a,
          backgroundColor: 0x001e2d,
          shininess: 30,
          waveHeight: 16,
          waveSpeed: 1.0,
          zoom: 0.7,
        })
      } else if (bg === 'birds') {
        const BIRDS = resolve(await import('vanta/dist/vanta.birds.min' as any))
        effectRef.current = BIRDS({
          el: containerRef.current, THREE,
          mouseControls: false, touchControls: false,
          backgroundColor: 0x1a3a5c,
          color1: 0x111111,
          color2: 0x222222,
          birdSize: 1.0,
          wingSpan: 25,
          speedLimit: 4,
          separation: 70,
          alignment: 60,
          cohesion: 50,
          quantity: 5,
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
          blurFactor: 0.6,
          speed: 1.2,
          zoom: 0.8,
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

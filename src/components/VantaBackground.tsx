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
          color: 0x004e70,
          backgroundColor: 0x00111d,
          shininess: 20,
          waveHeight: 18,
          waveSpeed: 0.8,
          zoom: 0.75,
        })
      } else if (bg === 'birds') {
        const BIRDS = resolve(await import('vanta/dist/vanta.birds.min' as any))
        effectRef.current = BIRDS({
          el: containerRef.current, THREE,
          mouseControls: false, touchControls: false,
          backgroundColor: 0x0a0f1a,
          color1: 0xffffff,
          color2: 0xaaccee,
          birdSize: 0.9,
          wingSpan: 22,
          speedLimit: 3,
          separation: 80,
          alignment: 50,
          cohesion: 50,
          quantity: 4,
        })
      } else if (bg === 'fog') {
        const FOG = resolve(await import('vanta/dist/vanta.fog.min' as any))
        effectRef.current = FOG({
          el: containerRef.current, THREE,
          mouseControls: false, touchControls: false,
          highlightColor: 0x3a6fa8,
          midtoneColor: 0x1a3a5a,
          lowlightColor: 0x060e1a,
          baseColor: 0x050c18,
          blurFactor: 0.65,
          speed: 0.8,
          zoom: 0.9,
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

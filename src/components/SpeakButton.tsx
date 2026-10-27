'use client'

import { useState, useRef } from 'react'

export default function SpeakButton({ text }: { text: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'playing'>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  async function toggle() {
    if (state === 'playing') {
      audioRef.current?.pause()
      setState('idle')
      return
    }

    setState('loading')
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error()

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => setState('idle')
      audio.onpause = () => setState('idle')
      await audio.play()
      setState('playing')
    } catch {
      setState('idle')
    }
  }

  return (
    <button
      onClick={toggle}
      title={state === 'playing' ? 'Pause' : 'Listen'}
      style={{
        background: state === 'playing' ? 'rgba(196,120,58,0.2)' : 'rgba(255,255,255,0.08)',
        border: `1px solid ${state === 'playing' ? 'rgba(196,120,58,0.5)' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: '9999px',
        width: '2rem', height: '2rem',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: state === 'loading' ? 'wait' : 'pointer',
        fontSize: '0.875rem',
        flexShrink: 0,
      }}
    >
      {state === 'loading' ? '⏳' : state === 'playing' ? '⏸' : '🔊'}
    </button>
  )
}

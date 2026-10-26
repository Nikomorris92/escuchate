'use client'

import { useState } from 'react'
import { useBg, BgEffect } from '@/lib/BgContext'
import { useLang } from '@/lib/LangContext'

const OPTIONS: { id: BgEffect; es: string; en: string; emoji: string }[] = [
  { id: 'none',     es: 'Apagado',  en: 'Off',      emoji: '⬛' },
  { id: 'waves',    es: 'Mar',      en: 'Ocean',    emoji: '🌊' },
  { id: 'forest',   es: 'Bosque',   en: 'Forest',   emoji: '🌿' },
  { id: 'universe', es: 'Universo', en: 'Universe', emoji: '🌌' },
]

export default function BgSelector() {
  const { bg, setBg } = useBg()
  const { lang } = useLang()
  const [open, setOpen] = useState(false)

  const current = OPTIONS.find(o => o.id === bg) ?? OPTIONS[0]
  const label = (o: typeof OPTIONS[0]) => lang === 'en' ? o.en : o.es

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Background"
        style={{
          background: open ? 'rgba(196,120,58,0.2)' : 'rgba(255,255,255,0.12)',
          border: `1.5px solid ${open ? 'rgba(196,120,58,0.6)' : 'rgba(255,255,255,0.3)'}`,
          borderRadius: '9999px',
          width: '2.5rem', height: '2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', cursor: 'pointer',
        }}
      >
        {current.emoji}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '3rem', right: 0,
          background: '#0d1a2e',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '0.875rem',
          padding: '0.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.25rem',
          minWidth: '130px',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => { setBg(opt.id); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.625rem',
                border: 'none',
                background: bg === opt.id ? 'rgba(196,120,58,0.2)' : 'transparent',
                color: bg === opt.id ? '#c4783a' : 'rgba(255,255,255,0.75)',
                fontSize: '0.875rem', fontWeight: bg === opt.id ? 600 : 400,
                cursor: 'pointer', textAlign: 'left', width: '100%',
              }}
            >
              <span style={{ fontSize: '1rem' }}>{opt.emoji}</span>
              {label(opt)}
              {bg === opt.id && <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'

const ITEMS_ES = {
  largo: [
    'Actividad física', 'Meditar', 'Leer', 'Estudiar',
    'Contacto con la naturaleza', 'Aprender un arte', 'Comida sana',
    'Conocer gente nueva', 'Ampliar tu círculo social',
    'Enfrentar momentos incómodos', 'Enfrentar tus miedos',
  ],
  placer: [
    'Redes sociales', 'Teléfono', 'Comida basura', 'Fiesta',
    'Drogas', 'Alcohol', 'Relaciones esporádicas',
    'Pornografía', 'Masturbación', 'Reels', 'Quejas', 'Insultos',
  ],
}

const ITEMS_EN = {
  largo: [
    'Physical activity', 'Meditate', 'Read', 'Study',
    'Be in contact with nature', 'Learn an art', 'Healthy food',
    'Meet new people', 'Expand your social circle',
    'Face uncomfortable moments', 'Face your fears',
  ],
  placer: [
    'Social media', 'Phone', 'Junk food', 'Partying',
    'Drugs', 'Alcohol', 'Casual relationships',
    'Pornography', 'Masturbation', 'Reels', 'Complaints', 'Insults',
  ],
}

interface Props {
  lang: string
  onContinue: () => void
}

export default function VisionSlide({ lang, onContinue }: Props) {
  const items = lang === 'en' ? ITEMS_EN : ITEMS_ES
  const [largoChecked, setLargoChecked] = useState<Record<number, boolean>>({})
  const [placerChecked, setPlacerChecked] = useState<Record<number, boolean>>({})

  const largoCount = Object.values(largoChecked).filter(Boolean).length
  const placerCount = Object.values(placerChecked).filter(Boolean).length
  const total = largoCount + placerCount

  const largoPercent = total === 0 ? 50 : Math.round((largoCount / total) * 100)
  const placerPercent = total === 0 ? 50 : 100 - largoPercent

  return (
    <div style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>

      {/* Header */}
      <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
        {lang === 'en' ? '¿What do you invest your time in?' : '¿En qué inviertes tu tiempo?'}
      </h2>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
        {lang === 'en'
          ? 'Mark with ✕ what you do most often.'
          : 'Marca con ✕ lo que haces con más frecuencia.'}
      </p>

      {/* Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>

        {/* LEFT */}
        <div>
          <div style={{
            background: '#4caf70', borderRadius: '0.5rem',
            padding: '0.5rem 0.875rem', marginBottom: '0.75rem',
            textAlign: 'center', fontSize: '0.75rem', fontWeight: 700,
            color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {lang === 'en' ? 'Long-term vision' : 'Visión a largo plazo'}
            {largoCount > 0 && <span style={{ marginLeft: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '0.1rem 0.5rem' }}>{largoCount}</span>}
          </div>
          {items.largo.map((item, i) => (
            <div
              key={i}
              onClick={() => setLargoChecked(p => ({ ...p, [i]: !p[i] }))}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.5rem 0.625rem', marginBottom: '0.25rem',
                borderRadius: '0.5rem', cursor: 'pointer',
                background: largoChecked[i] ? 'rgba(76,175,112,0.15)' : 'rgba(255,255,255,0.03)',
                border: largoChecked[i] ? '1px solid rgba(76,175,112,0.4)' : '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: '1.125rem', height: '1.125rem', flexShrink: 0,
                border: largoChecked[i] ? '2px solid #4caf70' : '2px solid rgba(255,255,255,0.25)',
                borderRadius: '0.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: largoChecked[i] ? '#4caf70' : 'transparent',
                color: '#fff', fontSize: '0.7rem', fontWeight: 700,
              }}>
                {largoChecked[i] ? '✕' : ''}
              </div>
              <span style={{ fontSize: '0.875rem', color: largoChecked[i] ? '#fff' : 'rgba(255,255,255,0.65)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          <div style={{
            background: '#e05c4b', borderRadius: '0.5rem',
            padding: '0.5rem 0.875rem', marginBottom: '0.75rem',
            textAlign: 'center', fontSize: '0.75rem', fontWeight: 700,
            color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {lang === 'en' ? 'Momentary pleasure' : 'Placer momentáneo'}
            {placerCount > 0 && <span style={{ marginLeft: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '0.1rem 0.5rem' }}>{placerCount}</span>}
          </div>
          {items.placer.map((item, i) => (
            <div
              key={i}
              onClick={() => setPlacerChecked(p => ({ ...p, [i]: !p[i] }))}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.5rem 0.625rem', marginBottom: '0.25rem',
                borderRadius: '0.5rem', cursor: 'pointer',
                background: placerChecked[i] ? 'rgba(224,92,75,0.15)' : 'rgba(255,255,255,0.03)',
                border: placerChecked[i] ? '1px solid rgba(224,92,75,0.4)' : '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: '1.125rem', height: '1.125rem', flexShrink: 0,
                border: placerChecked[i] ? '2px solid #e05c4b' : '2px solid rgba(255,255,255,0.25)',
                borderRadius: '0.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: placerChecked[i] ? '#e05c4b' : 'transparent',
                color: '#fff', fontSize: '0.7rem', fontWeight: 700,
              }}>
                {placerChecked[i] ? '✕' : ''}
              </div>
              <span style={{ fontSize: '0.875rem', color: placerChecked[i] ? '#fff' : 'rgba(255,255,255,0.65)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual bar */}
      {total > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#4caf70', fontWeight: 600 }}>
              {lang === 'en' ? 'Long-term' : 'Largo plazo'} {largoPercent}%
            </span>
            <span style={{ fontSize: '0.75rem', color: '#e05c4b', fontWeight: 600 }}>
              {placerPercent}% {lang === 'en' ? 'Momentary' : 'Momentáneo'}
            </span>
          </div>
          <div style={{ height: '0.625rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '1rem',
              background: `linear-gradient(to right, #4caf70 ${largoPercent}%, #e05c4b ${largoPercent}%)`,
              transition: 'all 0.4s ease',
            }} />
          </div>
          <p style={{
            fontSize: '0.8125rem', marginTop: '0.75rem', fontStyle: 'italic',
            color: largoPercent >= 50 ? '#4caf70' : '#e05c4b',
          }}>
            {largoPercent >= 50
              ? (lang === 'en'
                ? 'Most of your time goes to growth. Keep it up.'
                : 'La mayoría de tu tiempo va al crecimiento. Sigue así.')
              : (lang === 'en'
                ? 'Most of your time goes to momentary pleasure. Is that what you want?'
                : 'La mayoría de tu tiempo va al placer momentáneo. ¿Es eso lo que quieres?')}
          </p>
        </div>
      )}

      <button className="btn-primary" style={{ width: '100%' }} onClick={onContinue}>
        {lang === 'en' ? 'Continue →' : 'Continuar →'}
      </button>
    </div>
  )
}

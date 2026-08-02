'use client'

import { useState } from 'react'
import { AREAS, AREA_MAP } from '@/lib/areas'
import { generateFeedback } from '@/lib/feedback'
import type { Area } from '@/types'

const area = AREAS[4] // El miedo

const mockAnswers: Record<number, number> = { 1: 3, 2: 3, 3: 1, 4: 1, 5: 2, 6: 1, 7: 0, 8: 2, 9: 3, 10: 1, 11: 2 }
const mockAreaOrder: Area[] = ['acceptance', 'discipline', 'no_complaining', 'leap', 'gratitude', 'observe', 'obstacle', 'here_now', 'voices', 'mirror', 'healthy_relationships']
const mockFeedback = generateFeedback(mockAnswers, mockAreaOrder)

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

type Phase = 'result' | 'teachings' | 'exercise' | 'reflection'

export default function PreviewPage() {
  const [phase, setPhase] = useState<Phase>("teachings")
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [reflection, setReflection] = useState('')
  const wordCount = countWords(reflection)
  const sufficient = wordCount >= 30

  if (phase === 'result') {
    const startArea = AREA_MAP[mockAreaOrder[0]]
    const feedbackLines = mockFeedback.split('\n\n').filter(Boolean)
    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Lo que vemos
          </p>
          <div style={{ marginBottom: '2rem' }}>
            {feedbackLines.map((line, i) => (
              <p key={i} style={{ fontSize: '1.0625rem', color: '#ffffff', lineHeight: '1.75', marginBottom: i < feedbackLines.length - 1 ? '1rem' : 0 }}>
                {line}
              </p>
            ))}
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Tu punto de partida
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.375rem' }}>
            {startArea.title}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#c4783a', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "{startArea.subtitle}"
          </p>
          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Tu orden completo
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {mockAreaOrder.map((areaId, i) => (
                <div key={areaId} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.4)', fontWeight: i === 0 ? '600' : '400' }}>
                  <span style={{ width: '1.25rem', textAlign: 'right', flexShrink: 0, color: 'rgba(255,255,255,0.3)' }}>{i + 1}.</span>
                  <span>{AREA_MAP[areaId]?.title}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={() => setPhase('teachings')}>
            Empezar el recorrido
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'exercise' && area.practicalExercise) {
    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <button className="btn-ghost" style={{ marginBottom: '1.5rem', paddingLeft: 0 }} onClick={() => setPhase('teachings')}>
            ← Volver
          </button>
          <p style={{ fontSize: '0.75rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Ejercicio práctico · {area.title}
          </p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.4', marginBottom: '1.5rem' }}>
            Ponlo en práctica
          </h2>
          <div style={{ marginBottom: '1.5rem' }}>
            {area.practicalExercise.description.split('\n\n').map((block, i) => (
              <p key={i} style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', marginBottom: '1rem' }}>
                {block}
              </p>
            ))}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: '1rem' }}>
            {area.practicalExercise.prompt}
          </p>
          <textarea className="reflection-textarea" style={{ minHeight: '100px' }} placeholder="(Opcional) Escribe cómo fue…" />
          <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setPhase('reflection')}>
            Ir a la reflexión →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'reflection') {
    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <button className="btn-ghost" style={{ marginBottom: '1.5rem', paddingLeft: 0 }} onClick={() => setPhase(area.practicalExercise ? 'exercise' : 'teachings')}>
            ← Volver
          </button>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Reflexión · {area.title}
          </p>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ffffff', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {area.reflection}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#ffffff', fontWeight: '600', lineHeight: '1.6', marginBottom: '0.875rem' }}>
            Tómate este trabajo en serio. Las reflexiones son para ti — no para cumplir. A nada sirve engañarte: escribir lo que crees que hay que escribir, o pedirle a una IA que lo haga por ti. El único que gana o pierde aquí eres tú.
          </p>
          <textarea
            className="reflection-textarea"
            placeholder="Escribe aquí tu reflexión…"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
          <p className={`word-count${sufficient ? ' sufficient' : ''}`}>
            {wordCount} / 30 palabras mínimas
          </p>
          <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
            Completar nivel
          </button>
          <p className="disclaimer">Tus reflexiones son privadas y solo tú puedes verlas.</p>
        </div>
      </div>
    )
  }

  // fase: teachings
  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
            {area.title}
          </p>
          <h1 style={{ fontSize: '1.625rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.3' }}>
            {area.subtitle}
          </h1>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
          Marca con una ✕ el cuadrado al lado de la frase una vez leída.
        </p>
        <div style={{ marginBottom: '2rem' }}>
          {area.teachings.map((t, i) => (
            <div key={i} className="teaching-item">
              <button
                className={`teaching-check${checked[i] ? ' checked' : ''}`}
                onClick={() => setChecked((p: Record<number, boolean>) => ({ ...p, [i]: !p[i] }))}
              >
                {checked[i] ? '✕' : ''}
              </button>
              <span className={`teaching-text${checked[i] ? ' checked' : ''}`}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{
          padding: '1.25rem',
          background: 'rgba(196,120,58,0.1)',
          border: '1px solid rgba(196,120,58,0.3)',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            En las relaciones
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.65', margin: 0 }}>
            {area.inRelacion}
          </p>
        </div>

        <button className="btn-primary" onClick={() => setPhase(area.practicalExercise ? 'exercise' : 'reflection')}>
          {area.practicalExercise ? 'Ir a los ejercicios →' : 'Ir a la reflexión →'}
        </button>
      </div>
    </div>
  )
}

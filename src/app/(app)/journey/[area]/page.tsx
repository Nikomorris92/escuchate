'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { AREA_MAP } from '@/lib/areas'
import { AREA_COMPLETION_FEEDBACK } from '@/lib/feedback'
import { createClient } from '@/lib/supabase/client'

const MIN_WORDS = 30
const MAX_SCORE_WORDS = 150

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function computeScore(wordCount: number): number {
  if (wordCount < MIN_WORDS) return 0
  const capped = Math.min(wordCount, MAX_SCORE_WORDS)
  return Math.round(10 + ((capped - MIN_WORDS) / (MAX_SCORE_WORDS - MIN_WORDS)) * 40)
}

type Phase = 'teachings' | 'exercise' | 'exercise2' | 'reflection' | 'done'

type JournalEntry = { id: string; content: string; entry_date: string; created_at: string }

export default function JourneyAreaPage() {
  const params = useParams()
  const router = useRouter()
  const areaId = params.area as string
  const area = AREA_MAP[areaId]

  const [phase, setPhase] = useState<Phase>('teachings')
  const [reflection, setReflection] = useState('')
  const [practiceNote, setPracticeNote] = useState('')
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [earnedScore, setEarnedScore] = useState(0)
  const [alreadyDone, setAlreadyDone] = useState(false)
  const [lastInsertId, setLastInsertId] = useState<string | null>(null)
  const [shared, setShared] = useState(false)
  const [sharedName, setSharedName] = useState('')
  const [sharing, setSharing] = useState(false)

  // Coaching journal
  const [isCoachingClient, setIsCoachingClient] = useState(false)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [journalText, setJournalText] = useState('')
  const [savingJournal, setSavingJournal] = useState(false)
  const [journalSaved, setJournalSaved] = useState(false)

  const wordCount = countWords(reflection)
  const sufficient = wordCount >= MIN_WORDS

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [progressRes, profileRes, journalRes] = await Promise.all([
        supabase.from('level_progress').select('id').eq('user_id', user.id).eq('area', areaId).limit(1),
        supabase.from('user_profiles').select('is_coaching_client').eq('id', user.id).single(),
        fetch(`/api/coaching/journal?area=${areaId}`),
      ])

      if (progressRes.data && progressRes.data.length > 0) setAlreadyDone(true)
      if (profileRes.data?.is_coaching_client) {
        setIsCoachingClient(true)
        const json = await journalRes.json()
        setJournalEntries(json.entries ?? [])
      }
    }
    init()
  }, [areaId])

  async function saveJournalEntry() {
    if (!journalText.trim()) return
    setSavingJournal(true)
    const res = await fetch('/api/coaching/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ area: areaId, content: journalText }),
    })
    const json = await res.json()
    if (json.entry) {
      setJournalEntries(prev => [json.entry, ...prev])
      setJournalText('')
      setJournalSaved(true)
      setTimeout(() => setJournalSaved(false), 2000)
    }
    setSavingJournal(false)
  }

  if (!area) {
    return (
      <div className="page-container">
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Área no encontrada.</p>
      </div>
    )
  }

  async function handleSubmit() {
    if (!sufficient) {
      setError('Todavía no es suficiente para detenerte a pensar de verdad. Intenta ir un poco más a fondo.')
      return
    }
    setError('')
    setSaving(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setSaving(false); return }

      const score = computeScore(wordCount)

      const { data: inserted, error: insertError } = await supabase.from('level_progress').insert({
        user_id: user.id,
        area: areaId,
        reflection_text: reflection,
        word_count: wordCount,
        score,
      }).select('id').single()
      if (insertError) throw insertError
      if (inserted) setLastInsertId(inserted.id)

      // punti solo alla prima volta
      if (!alreadyDone) {
        await supabase.rpc('increment_score', { user_id_param: user.id, amount: score })
      }

      setEarnedScore(score)
      setPhase('done')
    } catch (err) {
      console.error('handleSubmit error:', err)
      setError('Hubo un error al guardar. Inténtalo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  async function handleShare() {
    if (!lastInsertId) return
    setSharing(true)
    const supabase = createClient()
    await supabase.from('level_progress').update({
      is_shared: true,
      shared_name: sharedName.trim() || null,
    }).eq('id', lastInsertId)

    fetch('/api/notify-share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reflectionText: reflection,
        area: area.title,
        sharedName: sharedName.trim() || null,
      }),
    }).catch(() => {})

    setShared(true)
    setSharing(false)
  }

  /* ── FASE: COMPLETATO ── */
  if (phase === 'done') {
    const completionFeedback = AREA_COMPLETION_FEEDBACK[area.id as keyof typeof AREA_COMPLETION_FEEDBACK]
    return (
      <div className="page-container">
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</p>
            <h2 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem', color: '#ffffff' }}>
              Nivel completado
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
              {area.title}
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.375rem 1.25rem', background: 'rgba(196,120,58,0.15)',
              border: '1px solid rgba(196,120,58,0.4)', color: '#c4783a',
              borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600',
            }}>
              +{earnedScore} pts
            </div>
          </div>

          {completionFeedback && (
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.75rem',
              marginBottom: '2rem',
            }}>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.75', margin: 0 }}>
                {completionFeedback}
              </p>
            </div>
          )}

          {/* Blocco condivisione */}
          <div style={{
            padding: '1.25rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0.875rem',
            marginBottom: '1.25rem',
          }}>
            {shared ? (
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', margin: 0 }}>
                ✓ Reflexión compartida en el muro. Gracias.
              </p>
            ) : (
              <>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Tu reflexión puede ayudar a otras personas en su recorrido. ¿Quieres compartirla en el muro?
                </p>
                <input
                  className="input-field"
                  style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}
                  type="text"
                  placeholder="Tu nombre (opcional — si no, aparece anónimo)"
                  value={sharedName}
                  onChange={(e) => setSharedName(e.target.value)}
                  maxLength={40}
                />
                <button
                  className="btn-primary"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={handleShare}
                  disabled={sharing}
                >
                  {sharing ? 'Compartiendo…' : 'Compartir mi reflexión'}
                </button>
              </>
            )}
          </div>

          <button className="btn-primary" onClick={() => router.push('/dashboard')}>
            Volver al recorrido
          </button>
        </div>
      </div>
    )
  }

  /* ── FASE: REFLEXIÓN ── */
  if (phase === 'reflection') {
    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <button className="btn-ghost" style={{ marginBottom: '1.5rem', paddingLeft: 0 }}
            onClick={() => setPhase(area.practicalExercise ? 'exercise' : 'teachings')}>
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
            {wordCount} / {MIN_WORDS} palabras mínimas
          </p>

          {error && (
            <p style={{ fontSize: '0.875rem', color: '#c4783a', marginTop: '0.75rem', lineHeight: '1.5' }}>
              {error}
            </p>
          )}

          <button
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? 'Guardando…' : 'Completar nivel'}
          </button>

          <p className="disclaimer">
            Tus reflexiones son privadas y solo tú puedes verlas.
          </p>
        </div>
      </div>
    )
  }

  /* ── FASE: EJERCICIO ── */
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

          <textarea
            className="reflection-textarea"
            style={{ minHeight: '100px' }}
            placeholder="(Opcional) Escribe cómo fue…"
            value={practiceNote}
            onChange={(e) => setPracticeNote(e.target.value)}
          />

          <button
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={() => setPhase(area.secondExercise ? 'exercise2' : 'reflection')}
          >
            {area.secondExercise ? 'Siguiente ejercicio →' : 'Ir a la reflexión →'}
          </button>
        </div>
      </div>
    )
  }

  /* ── FASE: SEGUNDO EJERCICIO ── */
  if (phase === 'exercise2' && area.secondExercise) {
    return (
      <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <button className="btn-ghost" style={{ marginBottom: '1.5rem', paddingLeft: 0 }} onClick={() => setPhase('exercise')}>
            ← Volver
          </button>

          <p style={{ fontSize: '0.75rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Segundo ejercicio · {area.title}
          </p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.4', marginBottom: '1.5rem' }}>
            La carta que no enviarás
          </h2>

          <div style={{ marginBottom: '1.5rem' }}>
            {area.secondExercise.description.split('\n\n').map((block, i) => (
              <p key={i} style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', marginBottom: '1rem' }}>
                {block}
              </p>
            ))}
          </div>

          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: '1rem' }}>
            {area.secondExercise.prompt}
          </p>

          <textarea
            className="reflection-textarea"
            style={{ minHeight: '140px' }}
            placeholder="Escribe aquí tu carta…"
            value={practiceNote}
            onChange={(e) => setPracticeNote(e.target.value)}
          />

          <button
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={() => setPhase('reflection')}
          >
            Ir a la reflexión →
          </button>
        </div>
      </div>
    )
  }

  /* ── FASE: INSEGNAMENTI ── */
  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <button className="btn-ghost" style={{ marginBottom: '1.5rem', paddingLeft: 0 }} onClick={() => router.push('/dashboard')}>
          ← Dashboard
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
            {area.title}
          </p>
          <h1 style={{ fontSize: '1.625rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.3' }}>
            {area.subtitle}
          </h1>
        </div>

        {alreadyDone && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.75rem 1rem',
            background: 'rgba(196,120,58,0.1)',
            border: '1px solid rgba(196,120,58,0.3)',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '0.875rem', color: '#c4783a' }}>✓</span>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Ya completaste este nivel. Puedes volver a hacerlo — cada vez que lo relees, lo haces desde un lugar diferente.
            </p>
          </div>
        )}

        {area.unlockNotice && (
          <div style={{
            padding: '1.25rem',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
          }}>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
              {area.unlockNotice}
            </p>
          </div>
        )}

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
          Marca con una ✕ el cuadrado al lado de la frase una vez leída.
        </p>
        <div style={{ marginBottom: '2rem' }}>
          {area.teachings.map((teaching, i) => (
            <div key={i} className="teaching-item">
              <button
                className={`teaching-check${checked[i] ? ' checked' : ''}`}
                onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))}
              >
                {checked[i] ? '✕' : ''}
              </button>
              <span className={`teaching-text${checked[i] ? ' checked' : ''}`}>{teaching}</span>
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

        {/* Quaderno coaching — visibile solo ai clienti 1:1 */}
        {isCoachingClient && (
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1rem' }}>📓</span>
              <p style={{ fontSize: '0.75rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', margin: 0 }}>
                Tu quaderno · Follow up 1:1
              </p>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1rem', lineHeight: '1.6' }}>
              Scrivi come stai lavorando su quest'area. Nicola lo leggerà prima della tua sessione.
            </p>
            <textarea
              className="reflection-textarea"
              style={{ minHeight: '100px', marginBottom: '0.75rem' }}
              placeholder={`Come stai lavorando su ${area.title} questa settimana?`}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
            />
            <button
              className="btn-primary"
              onClick={saveJournalEntry}
              disabled={savingJournal || !journalText.trim()}
              style={{ width: '100%', marginBottom: journalEntries.length > 0 ? '1.5rem' : 0 }}
            >
              {journalSaved ? '✓ Guardado' : savingJournal ? 'Guardando…' : 'Guardar entrada'}
            </button>

            {journalEntries.length > 0 && (
              <div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  Entradas anteriores
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {journalEntries.map((e) => (
                    <div key={e.id} style={{
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.75rem',
                    }}>
                      <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                        {new Date(e.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        {' · '}
                        {new Date(e.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.65', margin: 0 }}>
                        {e.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

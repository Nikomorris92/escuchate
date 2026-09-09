'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'

interface MoodEntry {
  id: string
  rating: number
  note: string | null
  created_at: string
}

const copy = {
  es: {
    title: 'Mi progreso',
    subtitle: '¿Cómo te sientes hoy?',
    moodLabel: 'Tu estado de hoy',
    moodSub: 'De 1 (mal) a 10 (formidable)',
    save: 'Guardar',
    saving: 'Guardando…',
    saved: '✓ Guardado',
    history: 'Historial',
    avg: 'Media',
    journal_title: 'Tu cuaderno · Follow up 1:1',
    journal_sub: 'Apunta tus progresos y las cosas formidables que te han pasado esta semana.',
    journal_placeholder: '¿Qué cosas formidables te han pasado esta semana?',
    journal_save: 'Guardar entrada',
    journal_saving: 'Guardando…',
    journal_saved: '✓ Guardado',
    journal_history: 'Entradas anteriores',
    back: '← Dashboard',
    locked_title: 'Acceso reservado',
    locked_sub: 'Esta sección es exclusiva para alumnos del programa de coaching 1:1 con Nicola.',
    locked_contact: 'Contactar a Nicola',
  },
  en: {
    title: 'My progress',
    subtitle: 'How do you feel today?',
    moodLabel: 'Your mood today',
    moodSub: 'From 1 (bad) to 10 (formidable)',
    save: 'Save',
    saving: 'Saving…',
    saved: '✓ Saved',
    history: 'History',
    avg: 'Average',
    journal_title: 'Your journal · Follow up 1:1',
    journal_sub: 'Write down your progress and the formidable things that happened this week.',
    journal_placeholder: 'What formidable things happened to you this week?',
    journal_save: 'Save entry',
    journal_saving: 'Saving…',
    journal_saved: '✓ Saved',
    journal_history: 'Previous entries',
    back: '← Dashboard',
    locked_title: 'Restricted access',
    locked_sub: 'This section is exclusive to students of the 1:1 coaching program with Nicola.',
    locked_contact: 'Contact Nicola',
  },
}

export default function CoachingPage() {
  const router = useRouter()
  const { lang } = useLang()
  const c = copy[lang]

  const [isCoachingClient, setIsCoachingClient] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mood
  const [moodValue, setMoodValue] = useState(5)
  const [moodTouched, setMoodTouched] = useState(false)
  const [savingMood, setSavingMood] = useState(false)
  const [savedMood, setSavedMood] = useState(false)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])

  // Journal (cuaderno)
  const [journalText, setJournalText] = useState('')
  const [savingJournal, setSavingJournal] = useState(false)
  const [savedJournal, setSavedJournal] = useState(false)
  const [journalHistory, setJournalHistory] = useState<MoodEntry[]>([])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_coaching_client')
        .eq('id', user.id)
        .single()

      setIsCoachingClient(profile?.is_coaching_client ?? false)

      // Mood history — usa area 'daily_mood'
      const { data: mood } = await supabase.rpc('get_my_coaching_ratings')
      const daily = (mood ?? []).filter((r: MoodEntry & { area: string }) => r.area === 'daily_mood')
      setMoodHistory(daily)

      // Journal history — usa area 'journal'
      const journal = (mood ?? []).filter((r: MoodEntry & { area: string }) => r.area === 'journal')
      setJournalHistory(journal)

      setLoading(false)
    }
    load()
  }, [router])

  async function handleSaveMood() {
    if (!moodTouched) return
    setSavingMood(true)
    const supabase = createClient()
    const { data } = await supabase.rpc('save_coaching_rating', {
      p_area: 'daily_mood',
      p_rating: moodValue,
      p_note: null,
    })
    if (data) {
      setMoodHistory(prev => [data as MoodEntry, ...prev])
      setSavedMood(true)
      setMoodTouched(false)
      setTimeout(() => setSavedMood(false), 2000)
    }
    setSavingMood(false)
  }

  async function handleSaveJournal() {
    if (!journalText.trim()) return
    setSavingJournal(true)
    const supabase = createClient()
    const { data } = await supabase.rpc('save_coaching_rating', {
      p_area: 'journal',
      p_rating: 0,
      p_note: journalText.trim(),
    })
    if (data) {
      setJournalHistory(prev => [data as MoodEntry, ...prev])
      setJournalText('')
      setSavedJournal(true)
      setTimeout(() => setSavedJournal(false), 2000)
    }
    setSavingJournal(false)
  }

  const avg = moodHistory.length > 0
    ? (moodHistory.reduce((sum, r) => sum + r.rating, 0) / moodHistory.length).toFixed(1)
    : null

  if (loading) return (
    <div className="page-container">
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>Cargando…</p>
    </div>
  )

  if (!isCoachingClient) return (
    <div className="page-container">
      <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
        <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</p>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.75rem' }}>
          {c.locked_title}
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {c.locked_sub}
        </p>
        <a href="mailto:escuchateati26@gmail.com" style={{
          display: 'inline-block', padding: '0.75rem 1.5rem',
          background: 'rgba(196,120,58,0.15)', border: '1px solid rgba(196,120,58,0.3)',
          borderRadius: '0.75rem', color: '#c4783a', fontWeight: '600',
          fontSize: '0.9375rem', textDecoration: 'none',
        }}>
          {c.locked_contact}
        </a>
        <div style={{ marginTop: '1.25rem' }}>
          <Link href="/dashboard" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
            ← Dashboard
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/dashboard" className="btn-ghost" style={{ paddingLeft: 0 }}>{c.back}</Link>
        </div>

        <h1 style={{ fontSize: '1.625rem', fontWeight: '700', color: '#ffffff', marginBottom: '2rem' }}>
          {c.title}
        </h1>

        {/* Slider umore giornaliero */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.25rem' }}>{c.subtitle}</p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{c.moodSub}</p>
            </div>
            {avg && (
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.35)', margin: '0 0 0.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.avg}</p>
                <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#c4783a' }}>{avg}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>/10</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>{c.moodLabel}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: moodTouched ? '#ffffff' : 'rgba(255,255,255,0.3)' }}>
                {moodTouched ? moodValue : '—'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={moodValue}
              onChange={(e) => { setMoodValue(Number(e.target.value)); setMoodTouched(true) }}
              style={{ width: '100%', accentColor: '#c4783a' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>
              <span>1</span><span>5</span><span>10</span>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleSaveMood}
            disabled={!moodTouched || savingMood}
            style={{ opacity: moodTouched ? 1 : 0.4 }}
          >
            {savedMood ? c.saved : savingMood ? c.saving : c.save}
          </button>

          {/* Storico mood */}
          {moodHistory.length > 0 && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {c.history}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {moodHistory.slice(0, 10).map((r) => (
                  <div key={r.id} style={{
                    padding: '0.25rem 0.625rem', borderRadius: '0.375rem',
                    background: 'rgba(255,255,255,0.06)', fontSize: '0.8125rem',
                  }}>
                    <span style={{ color: '#c4783a', fontWeight: '600' }}>{r.rating}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6875rem', marginLeft: '0.375rem' }}>
                      {new Date(r.created_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cuaderno / Journal */}
        <div className="card">
          <p style={{ fontSize: '0.6875rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '0.5rem' }}>
            📓 {c.journal_title}
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '1rem' }}>
            {c.journal_sub}
          </p>

          <textarea
            className="reflection-textarea"
            style={{ minHeight: '120px', fontSize: '0.9375rem', marginBottom: '0.875rem' }}
            placeholder={c.journal_placeholder}
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
          />

          <button
            className="btn-primary"
            onClick={handleSaveJournal}
            disabled={!journalText.trim() || savingJournal}
            style={{ opacity: journalText.trim() ? 1 : 0.4 }}
          >
            {savedJournal ? c.journal_saved : savingJournal ? c.journal_saving : c.journal_save}
          </button>

          {/* Storico journal */}
          {journalHistory.length > 0 && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {c.journal_history}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {journalHistory.slice(0, 5).map((r) => (
                  <div key={r.id} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.625rem' }}>
                    <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', margin: '0 0 0.375rem' }}>
                      {new Date(r.created_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', margin: 0 }}>
                      {r.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

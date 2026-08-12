'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AREA_MAP, AREA_TITLES_EN } from '@/lib/areas'
import { AREA_FEEDBACK } from '@/lib/feedback'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

type Reflection = { id: string; content: string; created_at: string }

function areaTitle(areaId: string, lang: 'es' | 'en') {
  return lang === 'en' ? (AREA_TITLES_EN[areaId] ?? AREA_MAP[areaId]?.title) : AREA_MAP[areaId]?.title
}

function areaFeedback(areaId: string, lang: 'es' | 'en') {
  if (lang === 'en') {
    const key = `quiz_feedback_${areaId}` as Parameters<typeof t>[1]
    return t('en', key)
  }
  return AREA_FEEDBACK[areaId as keyof typeof AREA_FEEDBACK] ?? ''
}

export default function InicioPage() {
  const router = useRouter()
  const { lang } = useLang()
  const supabase = createClient()

  const [introReflection, setIntroReflection] = useState('')
  const [areaOrder, setAreaOrder] = useState<string[]>([])
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [newReflection, setNewReflection] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('intro_reflection, area_order')
        .eq('id', user.id)
        .single()

      if (profile) {
        setIntroReflection(profile.intro_reflection ?? '')
        setAreaOrder(profile.area_order ?? [])
      }

      const { data: refs } = await supabase
        .from('home_reflections')
        .select('id, content, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setReflections(refs ?? [])
      setLoading(false)
    }
    load()
  }, [])

  async function saveReflection() {
    if (!newReflection.trim()) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('home_reflections')
      .insert({ user_id: user.id, content: newReflection.trim() })
      .select('id, content, created_at')
      .single()
    if (data) {
      setReflections([data, ...reflections])
      setNewReflection('')
    }
    setSaving(false)
  }

  async function deleteReflection(id: string) {
    await supabase.from('home_reflections').delete().eq('id', id)
    setReflections(reflections.filter(r => r.id !== id))
  }

  const topAreas = areaOrder.slice(0, 3)

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="page-container">
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9375rem' }}>
          {lang === 'en' ? 'Loading…' : 'Cargando…'}
        </p>
      </div>
    )
  }

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff' }}>
            {lang === 'en' ? 'My starting point' : 'Mi punto de partida'}
          </h1>
          <Link href="/dashboard" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            {lang === 'en' ? '← Journey' : '← Recorrido'}
          </Link>
        </div>

        {/* Feedback iniziale quiz */}
        {topAreas.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {lang === 'en' ? 'What we saw in you' : 'Lo que vimos en ti'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {topAreas.map((areaId, i) => (
                <div key={areaId} style={{
                  padding: '1.125rem',
                  background: i === 0 ? 'rgba(196,120,58,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 0 ? 'rgba(196,120,58,0.25)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '0.875rem',
                }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: '700', color: i === 0 ? '#c4783a' : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
                    {i === 0 ? (lang === 'en' ? 'Priority 1' : 'Prioridad 1') : `${lang === 'en' ? 'Priority' : 'Prioridad'} ${i + 1}`}
                  </p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.375rem' }}>
                    {areaTitle(areaId, lang)}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.65', margin: 0 }}>
                    {areaFeedback(areaId, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Riflessione iniziale scritta prima del quiz */}
        {introReflection && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {lang === 'en' ? 'What you wrote at the beginning' : 'Lo que escribiste al principio'}
            </p>
            <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem' }}>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>
                "{introReflection}"
              </p>
            </div>
          </div>
        )}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2.5rem' }} />

        {/* Nuova riflessione */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            {lang === 'en' ? 'Write a reflection' : 'Escribe una reflexión'}
          </p>
          <textarea
            className="reflection-textarea"
            placeholder={lang === 'en' ? 'How are you feeling today? What are you noticing?' : '¿Cómo estás hoy? ¿Qué estás notando?'}
            value={newReflection}
            onChange={(e) => setNewReflection(e.target.value)}
            style={{ minHeight: '120px', marginBottom: '0.75rem' }}
          />
          <button
            className="btn-primary"
            onClick={saveReflection}
            disabled={saving || !newReflection.trim()}
            style={{ width: '100%' }}
          >
            {saving ? (lang === 'en' ? 'Saving…' : 'Guardando…') : (lang === 'en' ? 'Save reflection' : 'Guardar reflexión')}
          </button>
        </div>

        {/* Riflessioni salvate */}
        {reflections.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {lang === 'en' ? 'My reflections' : 'Mis reflexiones'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {reflections.map((r) => (
                <div key={r.id} style={{ padding: '1.125rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                        {formatDate(r.created_at)}
                      </p>
                      <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.65', margin: 0 }}>
                        {r.content}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteReflection(r.id)}
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '1rem', padding: '0', flexShrink: 0 }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2rem' }} />

        {/* Rifai il quiz */}
        <Link href="/quiz" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0.875rem',
          textDecoration: 'none',
          marginBottom: '2rem',
        }}>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.2rem' }}>
              {lang === 'en' ? 'Redo the quiz' : 'Volver a hacer el test'}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              {lang === 'en' ? 'See how you have changed' : 'Descubre cómo has cambiado'}
            </p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>→</span>
        </Link>

      </div>
    </div>
  )
}

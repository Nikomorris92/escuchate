'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AREAS } from '@/lib/areas'

interface Rating {
  id: string
  area: string
  rating: number
  note: string | null
  created_at: string
}

export default function CoachingPage() {
  const router = useRouter()
  const [ratings, setRatings] = useState<Rating[]>([])
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCoachingClient, setIsCoachingClient] = useState(false)

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

      const { data } = await supabase.rpc('get_my_coaching_ratings')

      setRatings(data ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleSave(areaId: string) {
    const rating = selected[areaId]
    if (!rating) return

    setSaving(areaId)
    const supabase = createClient()
    const { data, error } = await supabase.rpc('save_coaching_rating', {
      p_area: areaId,
      p_rating: rating,
      p_note: notes[areaId]?.trim() || null,
    })

    if (!error && data) {
      setRatings(prev => [data as Rating, ...prev])
      setSelected(prev => ({ ...prev, [areaId]: 0 }))
      setNotes(prev => ({ ...prev, [areaId]: '' }))
      setSaved(areaId)
      setTimeout(() => setSaved(null), 2000)
    }
    setSaving(null)
  }

  function ratingsForArea(areaId: string) {
    return ratings.filter(r => r.area === areaId)
  }

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
          Acceso reservado
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Esta sección es exclusiva para alumnos del programa de coaching 1:1 con Nicola.
        </p>
        <a href="mailto:escuchateatimismo@gmail.com" style={{
          display: 'inline-block', padding: '0.75rem 1.5rem',
          background: 'rgba(196,120,58,0.15)', border: '1px solid rgba(196,120,58,0.3)',
          borderRadius: '0.75rem', color: '#c4783a', fontWeight: '600',
          fontSize: '0.9375rem', textDecoration: 'none',
        }}>
          Contactar a Nicola
        </a>
        <div style={{ marginTop: '1.25rem' }}>
          <Link href="/dashboard" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
            ← Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Link href="/dashboard" className="btn-ghost" style={{ paddingLeft: 0 }}>← Dashboard</Link>
        </div>

        <h1 style={{ fontSize: '1.625rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.375rem' }}>
          Mi progreso
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Puntúa cada área del 1 al 10 para ver tu evolución.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {AREAS.map((area) => {
            const areaRatings = ratingsForArea(area.id)
            const latest = areaRatings[0]
            const first = areaRatings[areaRatings.length - 1]
            const delta = areaRatings.length >= 2 ? latest.rating - first.rating : null
            const currentVal = selected[area.id] ?? 0

            return (
              <div key={area.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', margin: 0 }}>{area.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', margin: '0.2rem 0 0' }}>{area.subtitle}</p>
                  </div>
                  {latest && (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#c4783a' }}>{latest.rating}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>/10</span>
                      {delta !== null && (
                        <p style={{
                          fontSize: '0.75rem', margin: '0.15rem 0 0', fontWeight: '600',
                          color: delta > 0 ? '#4ade80' : delta < 0 ? '#f87171' : 'rgba(255,255,255,0.4)',
                        }}>
                          {delta > 0 ? `+${delta}` : delta === 0 ? '=' : delta} vs inicio
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Slider voto */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>Nuevo voto</span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: '700', color: currentVal ? '#ffffff' : 'rgba(255,255,255,0.3)' }}>
                      {currentVal || '—'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={currentVal || 1}
                    onChange={(e) => setSelected(prev => ({ ...prev, [area.id]: Number(e.target.value) }))}
                    onClick={() => { if (!currentVal) setSelected(prev => ({ ...prev, [area.id]: 5 })) }}
                    style={{ width: '100%', accentColor: '#c4783a' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>
                    <span>1</span><span>5</span><span>10</span>
                  </div>
                </div>

                {/* Note */}
                {currentVal > 0 && (
                  <textarea
                    className="reflection-textarea"
                    style={{ minHeight: '64px', fontSize: '0.875rem', marginBottom: '0.75rem' }}
                    placeholder="Nota opcional (¿qué ha cambiado?)…"
                    value={notes[area.id] ?? ''}
                    onChange={(e) => setNotes(prev => ({ ...prev, [area.id]: e.target.value }))}
                  />
                )}

                <button
                  className="btn-primary"
                  onClick={() => handleSave(area.id)}
                  disabled={!currentVal || saving === area.id}
                  style={{ opacity: currentVal ? 1 : 0.4 }}
                >
                  {saved === area.id ? '✓ Guardado' : saving === area.id ? 'Guardando…' : 'Guardar voto'}
                </button>

                {/* Storico voti */}
                {areaRatings.length > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Historial
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {areaRatings.slice(0, 6).map((r) => (
                        <div key={r.id} style={{
                          padding: '0.25rem 0.625rem', borderRadius: '0.375rem',
                          background: 'rgba(255,255,255,0.06)',
                          fontSize: '0.8125rem',
                        }}>
                          <span style={{ color: '#c4783a', fontWeight: '600' }}>{r.rating}</span>
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6875rem', marginLeft: '0.25rem' }}>
                            {new Date(r.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      ))}
                    </div>
                    {areaRatings[0]?.note && (
                      <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        "{areaRatings[0].note}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

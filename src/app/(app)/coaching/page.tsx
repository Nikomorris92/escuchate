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

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase
        .from('coaching_ratings')
        .select('id, area, rating, note, created_at')
        .order('created_at', { ascending: false })

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
    const { data, error } = await supabase
      .from('coaching_ratings')
      .insert({ area: areaId, rating, note: notes[areaId]?.trim() || null })
      .select('id, area, rating, note, created_at')
      .single()

    if (!error && data) {
      setRatings(prev => [data, ...prev])
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

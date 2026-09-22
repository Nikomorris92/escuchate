'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AREA_MAP } from '@/lib/areas'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'
const ALL_AREAS = Object.keys(AREA_MAP)

interface UserRow {
  id: string
  email: string
  paid: boolean
  is_coaching_client: boolean
  total_score: number
  quiz_completed: boolean
  created_at: string
  completedAreas: { area: string; completed_at: string }[]
  lastActivity: string | null
  daysSinceActivity: number | null
}

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function InactivityBadge({ days }: { days: number | null }) {
  if (days === null) return <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>mai attivo</span>
  const color = days <= 7 ? '#4CAF82' : days <= 21 ? '#C4783A' : '#E05757'
  return (
    <span style={{
      fontSize: '0.6875rem', fontWeight: '600', padding: '0.15rem 0.5rem',
      borderRadius: '9999px', background: `${color}18`, color,
    }}>
      {days === 0 ? 'oggi' : `${days}g fa`}
    </span>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<UserRow | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) { router.push('/dashboard'); return }

      // Tutti i profili
      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('id, paid, is_coaching_client, total_score, quiz_completed, created_at')

      // Tutti i completamenti
      const { data: progress } = await supabase
        .from('level_progress')
        .select('user_id, area, completed_at')
        .order('completed_at', { ascending: false })

      // Email da auth — usiamo la admin API via service key non disponibile client-side
      // Usiamo l'endpoint dedicato
      const emailRes = await fetch('/api/admin/users')
      const emailMap: Record<string, string> = emailRes.ok ? await emailRes.json() : {}

      const rows: UserRow[] = (profiles ?? []).map((p) => {
        const userProgress = (progress ?? []).filter(pr => pr.user_id === p.id)
        const lastActivity = userProgress[0]?.completed_at ?? null
        return {
          id: p.id,
          email: emailMap[p.id] ?? p.id.slice(0, 8) + '…',
          paid: p.paid,
          is_coaching_client: p.is_coaching_client,
          total_score: p.total_score ?? 0,
          quiz_completed: p.quiz_completed,
          created_at: p.created_at,
          completedAreas: userProgress.map(pr => ({ area: pr.area, completed_at: pr.completed_at })),
          lastActivity,
          daysSinceActivity: daysSince(lastActivity),
        }
      })

      // Ordina: più recenti per attività
      rows.sort((a, b) => {
        if (a.lastActivity && b.lastActivity) return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        if (a.lastActivity) return -1
        if (b.lastActivity) return 1
        return 0
      })

      setUsers(rows)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return (
    <div className="page-container">
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>Caricando…</p>
    </div>
  )

  const paid = users.filter(u => u.paid).length
  const active7 = users.filter(u => u.daysSinceActivity !== null && u.daysSinceActivity <= 7).length
  const inactive21 = users.filter(u => u.daysSinceActivity !== null && u.daysSinceActivity > 21).length

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>Admin · Utenti</h1>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{users.length} totali</span>
        </div>

        {/* KPI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { label: 'Paganti', value: paid, color: '#C4783A' },
            { label: 'Attivi 7gg', value: active7, color: '#4CAF82' },
            { label: 'Inattivi 21gg+', value: inactive21, color: '#E05757' },
          ].map(k => (
            <div key={k.label} style={{ padding: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: k.color, lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Tabella */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => setSelected(selected?.id === u.id ? null : u)}
              style={{
                width: '100%', textAlign: 'left', background: selected?.id === u.id ? 'rgba(196,120,58,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected?.id === u.id ? 'rgba(196,120,58,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '0.75rem', padding: '0.875rem 1rem', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: '500' }}>{u.email}</span>
                  {u.paid && <span style={{ fontSize: '0.6rem', fontWeight: '700', padding: '0.1rem 0.4rem', borderRadius: '9999px', background: 'rgba(196,120,58,0.15)', color: '#C4783A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>pagante</span>}
                  {u.is_coaching_client && <span style={{ fontSize: '0.6rem', fontWeight: '700', padding: '0.1rem 0.4rem', borderRadius: '9999px', background: 'rgba(76,175,130,0.12)', color: '#4CAF82', textTransform: 'uppercase', letterSpacing: '0.08em' }}>coaching</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{u.completedAreas.length}/{ALL_AREAS.length} aree</span>
                  <span style={{ fontSize: '0.75rem', color: '#C4783A', fontVariantNumeric: 'tabular-nums' }}>{u.total_score} pts</span>
                  <InactivityBadge days={u.daysSinceActivity} />
                </div>
              </div>

              {/* Dettaglio espanso */}
              {selected?.id === u.id && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                    Aree completate
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
                    {ALL_AREAS.map(areaId => {
                      const done = u.completedAreas.find(c => c.area === areaId)
                      return (
                        <span key={areaId} style={{
                          fontSize: '0.6875rem', padding: '0.25rem 0.625rem',
                          borderRadius: '9999px',
                          background: done ? 'rgba(76,175,130,0.12)' : 'rgba(255,255,255,0.04)',
                          color: done ? '#4CAF82' : 'rgba(255,255,255,0.25)',
                          border: `1px solid ${done ? 'rgba(76,175,130,0.2)' : 'rgba(255,255,255,0.07)'}`,
                        }}>
                          {AREA_MAP[areaId]?.title ?? areaId}
                          {done && <span style={{ marginLeft: '0.25rem', opacity: 0.6 }}>
                            {new Date(done.completed_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                          </span>}
                        </span>
                      )
                    })}
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                      Iscritto: {new Date(u.created_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    {u.lastActivity && (
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                        Ultima attività: {new Date(u.lastActivity).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

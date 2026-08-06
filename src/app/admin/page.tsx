'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AREAS } from '@/lib/areas'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

interface UserRow {
  id: string
  email: string
  quiz_completed: boolean
  current_level: number
  total_score: number
  advanced_unlocked: boolean
  created_at: string
}

interface Charge {
  id: string
  amount: number
  refunded: boolean
  created: number
}

interface Subscription {
  id: string
  status: string
  amount: number
}

interface StripeCustomer {
  id: string
  email: string
  name: string
  subscriptions: Subscription[]
  charges: Charge[]
}

interface MuroComment {
  id: string
  comment_text: string
  author_name: string | null
  created_at: string
}

interface MuroReflection {
  id: string
  area: string
  reflection_text: string
  shared_name: string | null
  completed_at: string
  comments?: MuroComment[]
  showComments?: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserRow[]>([])
  const [stripeCustomers, setStripeCustomers] = useState<StripeCustomer[]>([])
  const [stats, setStats] = useState({ total: 0, quizDone: 0, advanced: 0 })
  const [refunding, setRefunding] = useState<string | null>(null)
  const [refundMsg, setRefundMsg] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [muroReflections, setMuroReflections] = useState<MuroReflection[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/')
        return
      }
      setAuthorized(true)

      const { data } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setUsers(data)
        setStats({
          total: data.length,
          quizDone: data.filter((u) => u.quiz_completed).length,
          advanced: data.filter((u) => u.advanced_unlocked).length,
        })
      }

      const res = await fetch('/api/admin/customers')
      if (res.ok) {
        const json = await res.json()
        setStripeCustomers(json.customers ?? [])
      }

      const { data: muroData } = await supabase
        .from('level_progress')
        .select('id, area, reflection_text, shared_name, completed_at')
        .eq('is_shared', true)
        .order('completed_at', { ascending: false })
        .limit(100)
      setMuroReflections((muroData ?? []).map(r => ({ ...r, comments: [], showComments: false })))

      setLoading(false)
    }
    init()
  }, [router])

  async function loadMuroComments(reflectionId: string) {
    const supabase = createClient()
    const { data } = await supabase
      .from('reflection_comments')
      .select('id, comment_text, author_name, created_at')
      .eq('reflection_id', reflectionId)
      .order('created_at', { ascending: true })
    setMuroReflections(prev => prev.map(r =>
      r.id === reflectionId ? { ...r, comments: data ?? [], showComments: !r.showComments } : r
    ))
  }

  async function deleteContent(type: 'reflection' | 'comment', id: string, parentId?: string) {
    if (!confirm('¿Eliminar este contenido?')) return
    setDeletingId(id)
    await fetch('/api/admin/delete-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id }),
    })
    if (type === 'reflection') {
      setMuroReflections(prev => prev.filter(r => r.id !== id))
    } else {
      setMuroReflections(prev => prev.map(r =>
        r.id === parentId ? { ...r, comments: r.comments?.filter(c => c.id !== id) } : r
      ))
    }
    setDeletingId(null)
  }

  async function handleRefund(chargeId: string) {
    if (!confirm('¿Confirmas el reembolso?')) return
    setRefunding(chargeId)
    const res = await fetch('/api/admin/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chargeId }),
    })
    const json = await res.json()
    setRefunding(null)
    setRefundMsg((prev) => ({
      ...prev,
      [chargeId]: json.success ? '✓ Reembolso completado' : `Error: ${json.error}`,
    }))
  }

  if (loading) return <div className="page-container"><p style={{ color: 'rgba(255,255,255,0.6)' }}>Cargando…</p></div>
  if (!authorized) return null

  return (
    <div style={{ minHeight: '100dvh', padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff' }}>Panel Admin</h1>
        <button onClick={() => router.push('/')} style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
          ← Volver
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Usuarios totales', value: stats.total },
          { label: 'Quiz completado', value: stats.quizDone },
          { label: 'Avanzado desbloqueado', value: stats.advanced },
        ].map((s) => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>{s.value}</p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', margin: '0.25rem 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Stripe Clienti */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Pagamenti Stripe
        </h2>
        {stripeCustomers.filter(c => c.charges.length > 0 || c.subscriptions.length > 0).length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Nessun pagamento ancora.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {stripeCustomers.filter(c => c.charges.length > 0 || c.subscriptions.length > 0).map((c) => (
              <div key={c.id} style={{
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.75rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ffffff', margin: 0 }}>{c.email}</p>
                    {c.name && <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: '0.2rem 0 0' }}>{c.name}</p>}
                    {c.subscriptions.map(sub => (
                      <span key={sub.id} style={{
                        display: 'inline-block', marginTop: '0.375rem',
                        fontSize: '0.6875rem', padding: '0.15rem 0.5rem', borderRadius: '9999px',
                        background: sub.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(196,120,58,0.15)',
                        color: sub.status === 'active' ? '#4ade80' : '#c4783a',
                      }}>
                        {sub.status === 'active' ? 'Activo' : sub.status} — €{(sub.amount / 100).toFixed(2)}/año
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    {c.charges.map(ch => (
                      <div key={ch.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                            €{(ch.amount / 100).toFixed(2)}
                          </span>
                          {ch.refunded ? (
                            <span style={{
                              fontSize: '0.75rem', padding: '0.25rem 0.75rem',
                              borderRadius: '0.5rem',
                              background: 'rgba(239,68,68,0.12)',
                              border: '1px solid rgba(239,68,68,0.25)',
                              color: '#f87171', fontWeight: '600',
                            }}>
                              Rimborsado
                            </span>
                          ) : (
                            <button
                              onClick={() => handleRefund(ch.id)}
                              disabled={refunding === ch.id}
                              style={{
                                fontSize: '0.75rem', padding: '0.25rem 0.75rem',
                                borderRadius: '0.5rem',
                                background: 'rgba(239,68,68,0.15)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                color: '#f87171', cursor: 'pointer',
                              }}
                            >
                              {refunding === ch.id ? 'Rimborso…' : 'Rimborsa'}
                            </button>
                          )}
                        </div>
                        {refundMsg[ch.id] && (
                          <p style={{ fontSize: '0.75rem', color: '#4ade80', margin: 0 }}>{refundMsg[ch.id]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aree */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Las 11 áreas ({AREAS.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {AREAS.map((area, i) => (
            <div key={area.id} className="teaching-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ color: 'rgba(255,255,255,0.35)', marginRight: '0.75rem', fontSize: '0.8125rem' }}>{i + 1}</span>
                {area.title}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>{area.subtitle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Moderazione Muro */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Muro de reflexiones ({muroReflections.length})
        </h2>
        {muroReflections.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Nessuna riflessione condivisa.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {muroReflections.map((r) => (
              <div key={r.id} style={{
                padding: '1rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.75rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.6875rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {r.area} · {r.shared_name || 'Anónimo'}
                    </span>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', margin: '0.375rem 0 0', lineHeight: '1.6' }}>
                      "{r.reflection_text}"
                    </p>
                  </div>
                  <button
                    onClick={() => deleteContent('reflection', r.id)}
                    disabled={deletingId === r.id}
                    style={{
                      fontSize: '0.75rem', padding: '0.25rem 0.625rem',
                      borderRadius: '0.5rem', flexShrink: 0,
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.25)',
                      color: '#f87171', cursor: 'pointer',
                    }}
                  >
                    🗑 Elimina
                  </button>
                </div>

                {/* Commenti */}
                <button
                  onClick={() => loadMuroComments(r.id)}
                  style={{ marginTop: '0.625rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {r.showComments ? '▲ Nascondi commenti' : `▼ Commenti (${r.comments?.length ?? 0})`}
                </button>

                {r.showComments && r.comments && r.comments.length > 0 && (
                  <div style={{ marginTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {r.comments.map((c) => (
                      <div key={c.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem',
                        padding: '0.625rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem',
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.35)' }}>{c.author_name || 'Anónimo'}</span>
                          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', margin: '0.2rem 0 0', lineHeight: '1.5' }}>
                            {c.comment_text}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteContent('comment', c.id, r.id)}
                          disabled={deletingId === c.id}
                          style={{
                            fontSize: '0.6875rem', padding: '0.2rem 0.5rem', flexShrink: 0,
                            borderRadius: '0.375rem',
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#f87171', cursor: 'pointer',
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Utenti Supabase */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', margin: 0 }}>
            Usuarios registrados
          </h2>
          <input
            type="text"
            placeholder="Buscar por email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '0.5rem',
              padding: '0.375rem 0.75rem',
              color: '#ffffff',
              fontSize: '0.8125rem',
              outline: 'none',
              width: '200px',
            }}
          />
        </div>
        {users.filter(u => !search || (u.email ?? '').toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Ningún usuario todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {users.filter(u => !search || (u.email ?? '').toLowerCase().includes(search.toLowerCase())).map((u) => (
              <div key={u.id} className="teaching-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)' }}>{u.email || u.id.slice(0, 8)}</span>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                  <span>Nivel {u.current_level}</span>
                  <span>{u.total_score} pts</span>
                  {u.quiz_completed && <span style={{ color: '#c4783a' }}>Quiz ✓</span>}
                  {u.advanced_unlocked && <span style={{ color: '#c4783a' }}>Avanzado ✓</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

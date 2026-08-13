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

interface CoachingRating {
  id: string
  area: string
  rating: number
  note: string | null
  created_at: string
  user_email?: string
  user_id: string
}

interface AdminNotification {
  id: string
  type: string
  user_email: string
  area: string | null
  message: string
  read: boolean
  created_at: string
}

interface JournalEntry {
  id: string
  user_id: string
  area: string
  content: string
  entry_date: string
  created_at: string
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
  approved: boolean
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
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [coachingRatings, setCoachingRatings] = useState<CoachingRating[]>([])
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [activateEmail, setActivateEmail] = useState('')
  const [activating, setActivating] = useState(false)
  const [activateMsg, setActivateMsg] = useState('')
  const [selectedJournalUser, setSelectedJournalUser] = useState<string | null>(null)

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
        .select('id, area, reflection_text, shared_name, completed_at, approved')
        .eq('is_shared', true)
        .order('completed_at', { ascending: false })
        .limit(100)
      setMuroReflections((muroData ?? []).map(r => ({ ...r, comments: [], showComments: false })))

      const { data: coachingData } = await supabase
        .from('coaching_ratings')
        .select('id, user_id, area, rating, note, created_at')
        .order('created_at', { ascending: false })
      setCoachingRatings(coachingData ?? [])

      // Notifiche admin
      const { data: notifData } = await supabase
        .from('admin_notifications')
        .select('id, type, user_email, area, message, read, created_at')
        .order('created_at', { ascending: false })
        .limit(50)
      setNotifications(notifData ?? [])

      // Journal entries
      const journalRes = await fetch('/api/admin/coaching-journal')
      if (journalRes.ok) {
        const json = await journalRes.json()
        setJournalEntries(json.entries ?? [])
      }

      setLoading(false)
    }
    init()
  }, [router])

  async function approveReflection(id: string) {
    setApprovingId(id)
    await fetch('/api/admin/approve-reflection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setMuroReflections(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r))
    setApprovingId(null)
  }

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

  async function activateCoaching() {
    if (!activateEmail.trim()) return
    setActivating(true)
    setActivateMsg('')
    const res = await fetch('/api/admin/activate-coaching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': ADMIN_EMAIL },
      body: JSON.stringify({ email: activateEmail.trim() }),
    })
    const json = await res.json()
    if (json.success) {
      setActivateMsg(`✓ Coaching attivato per ${activateEmail}`)
      setActivateEmail('')
    } else {
      setActivateMsg(`Errore: ${json.error}`)
    }
    setActivating(false)
  }

  async function markNotificationsRead(ids: string[]) {
    await fetch('/api/admin/coaching-journal', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    })
    setNotifications(prev => prev.map(n => ids.includes(n.id) ? { ...n, read: true } : n))
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

      {/* Notifiche non lette */}
      {notifications.filter(n => !n.read).length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid rgba(196,120,58,0.4)', background: 'rgba(196,120,58,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#c4783a', margin: 0 }}>
              🔔 Nuovi aggiornamenti ({notifications.filter(n => !n.read).length})
            </h2>
            <button
              onClick={() => markNotificationsRead(notifications.filter(n => !n.read).map(n => n.id))}
              style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Segna tutti come letti
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {notifications.filter(n => !n.read).map(n => (
              <div key={n.id} style={{
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '0.625rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
              }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#ffffff', margin: '0 0 0.2rem', fontWeight: '500' }}>{n.message}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                    {new Date(n.created_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                    {' · '}{new Date(n.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedJournalUser(n.user_email); markNotificationsRead([n.id]) }}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(196,120,58,0.2)', border: '1px solid rgba(196,120,58,0.4)', color: '#c4783a', cursor: 'pointer', flexShrink: 0 }}
                >
                  Leggi →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attiva coaching */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Attiva coaching 1:1
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <input
            type="email"
            className="input-field"
            placeholder="Email del cliente…"
            value={activateEmail}
            onChange={(e) => setActivateEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && activateCoaching()}
            style={{ flex: 1 }}
          />
          <button
            className="btn-primary"
            onClick={activateCoaching}
            disabled={activating || !activateEmail.trim()}
            style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            {activating ? 'Attivando…' : 'Attiva coaching'}
          </button>
        </div>
        {activateMsg && (
          <p style={{ fontSize: '0.875rem', color: activateMsg.startsWith('✓') ? '#4ade80' : '#f87171', marginTop: '0.75rem' }}>
            {activateMsg}
          </p>
        )}
      </div>

      {/* Quaderni coaching */}
      {journalEntries.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
            📓 Quaderni 1:1
          </h2>

          {/* Filtro per utente */}
          {(() => {
            const uniqueEmails = [...new Set(
              journalEntries.map(e => users.find(u => u.id === e.user_id)?.email ?? e.user_id.slice(0, 8))
            )]
            return (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => setSelectedJournalUser(null)}
                  style={{
                    fontSize: '0.8125rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', cursor: 'pointer',
                    background: !selectedJournalUser ? 'rgba(196,120,58,0.2)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${!selectedJournalUser ? 'rgba(196,120,58,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    color: !selectedJournalUser ? '#c4783a' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  Tutti
                </button>
                {uniqueEmails.map(email => (
                  <button
                    key={email}
                    onClick={() => setSelectedJournalUser(email)}
                    style={{
                      fontSize: '0.8125rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', cursor: 'pointer',
                      background: selectedJournalUser === email ? 'rgba(196,120,58,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${selectedJournalUser === email ? 'rgba(196,120,58,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      color: selectedJournalUser === email ? '#c4783a' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {email}
                  </button>
                ))}
              </div>
            )
          })()}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {journalEntries
              .filter(e => {
                if (!selectedJournalUser) return true
                const email = users.find(u => u.id === e.user_id)?.email ?? e.user_id.slice(0, 8)
                return email === selectedJournalUser
              })
              .map(e => {
                const email = users.find(u => u.id === e.user_id)?.email ?? e.user_id.slice(0, 8)
                return (
                  <div key={e.id} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.75rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                          {e.area}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.5rem' }}>· {email}</span>
                      </div>
                      <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(e.created_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}{new Date(e.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.65', margin: 0 }}>
                      {e.content}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      )}

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

      {/* Coaching — Indice di successo */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Coaching — Progreso por alumno
        </h2>
        {coachingRatings.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Ningún voto registrado todavía.</p>
        ) : (() => {
          const byUser: Record<string, CoachingRating[]> = {}
          coachingRatings.forEach(r => {
            if (!byUser[r.user_id]) byUser[r.user_id] = []
            byUser[r.user_id].push(r)
          })
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {Object.entries(byUser).map(([userId, userRatings]) => {
                const userEmail = users.find(u => u.id === userId)?.email ?? userId.slice(0, 8)
                const byArea: Record<string, CoachingRating[]> = {}
                userRatings.forEach(r => {
                  if (!byArea[r.area]) byArea[r.area] = []
                  byArea[r.area].push(r)
                })

                return (
                  <div key={userId} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.75rem',
                  }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.875rem' }}>
                      {userEmail}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {Object.entries(byArea).map(([area, areaRatings]) => {
                        const sorted = [...areaRatings].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        const first = sorted[0].rating
                        const last = sorted[sorted.length - 1].rating
                        const delta = last - first
                        return (
                          <div key={area} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '0.5rem 0.75rem',
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '0.5rem',
                          }}>
                            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', flex: 1 }}>{area}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                                {first} → {last}
                              </span>
                              <span style={{
                                fontSize: '0.8125rem', fontWeight: '700', minWidth: '2.5rem', textAlign: 'right',
                                color: delta > 0 ? '#4ade80' : delta < 0 ? '#f87171' : 'rgba(255,255,255,0.4)',
                              }}>
                                {delta > 0 ? `+${delta}` : delta === 0 ? '=' : delta}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })()}
      </div>

      {/* Moderazione Muro */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Muro de reflexiones
        </h2>

        {/* In attesa di approvazione */}
        {(() => {
          const pending = muroReflections.filter(r => !r.approved)
          return (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', fontWeight: '600' }}>
                ⏳ In attesa ({pending.length})
              </p>
              {pending.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Nessuna in attesa.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {pending.map((r) => (
                    <div key={r.id} style={{
                      padding: '1rem',
                      background: 'rgba(245,158,11,0.06)',
                      border: '1px solid rgba(245,158,11,0.25)',
                      borderRadius: '0.75rem',
                    }}>
                      <span style={{ fontSize: '0.6875rem', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {r.area} · {r.shared_name || 'Anónimo'}
                      </span>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', margin: '0.375rem 0 0.875rem', lineHeight: '1.6' }}>
                        "{r.reflection_text}"
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => approveReflection(r.id)}
                          disabled={approvingId === r.id}
                          style={{
                            fontSize: '0.8125rem', padding: '0.375rem 1rem',
                            borderRadius: '0.5rem', fontWeight: '600',
                            background: 'rgba(34,197,94,0.15)',
                            border: '1px solid rgba(34,197,94,0.35)',
                            color: '#4ade80', cursor: 'pointer',
                          }}
                        >
                          {approvingId === r.id ? '…' : '✓ Approva'}
                        </button>
                        <button
                          onClick={() => deleteContent('reflection', r.id)}
                          disabled={deletingId === r.id}
                          style={{
                            fontSize: '0.8125rem', padding: '0.375rem 1rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            color: '#f87171', cursor: 'pointer',
                          }}
                        >
                          🗑 Rifiuta
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })()}

        {/* Approvate */}
        {(() => {
          const approved = muroReflections.filter(r => r.approved)
          return (
            <div>
              <p style={{ fontSize: '0.75rem', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', fontWeight: '600' }}>
                ✓ Pubblicate ({approved.length})
              </p>
              {approved.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Nessuna approvata ancora.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {approved.map((r) => (
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
                          🗑
                        </button>
                      </div>
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
          )
        })()}
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

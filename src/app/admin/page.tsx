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

interface StripeCustomer {
  id: string
  email: string
  name: string
  subscriptions: {
    id: string
    status: string
    amount: number
    current_period_end: number
    latest_payment_intent: string | null
  }[]
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserRow[]>([])
  const [stripeCustomers, setStripeCustomers] = useState<StripeCustomer[]>([])
  const [stats, setStats] = useState({ total: 0, quizDone: 0, advanced: 0 })
  const [refunding, setRefunding] = useState<string | null>(null)
  const [refundMsg, setRefundMsg] = useState<{ id: string; msg: string } | null>(null)

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
        .from('user_profiles')
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

      // Fetch Stripe customers
      const res = await fetch('/api/admin/customers')
      if (res.ok) {
        const json = await res.json()
        setStripeCustomers(json.customers ?? [])
      }

      setLoading(false)
    }
    init()
  }, [router])

  async function handleRefund(paymentIntentId: string, customerId: string) {
    if (!confirm('¿Confirmas el reembolso?')) return
    setRefunding(paymentIntentId)
    const res = await fetch('/api/admin/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId }),
    })
    const json = await res.json()
    setRefunding(null)
    setRefundMsg({
      id: customerId,
      msg: json.success ? '✓ Reembolso completado' : `Error: ${json.error}`,
    })
    setTimeout(() => setRefundMsg(null), 4000)
  }

  if (loading) {
    return (
      <div className="page-container">
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Cargando…</p>
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div style={{ minHeight: '100dvh', padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff' }}>Panel Admin</h1>
        <button
          onClick={() => router.push('/')}
          style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
        >
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

      {/* Stripe Pagamenti */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Pagamenti Stripe
        </h2>
        {stripeCustomers.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Nessun pagamento ancora.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stripeCustomers.map((c) => (
              <div key={c.id} style={{
                padding: '0.875rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#ffffff', margin: 0, fontWeight: '500' }}>{c.email}</p>
                    {c.name && <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: '0.2rem 0 0' }}>{c.name}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    {c.subscriptions.map((sub) => (
                      <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          background: sub.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(196,120,58,0.15)',
                          color: sub.status === 'active' ? '#4ade80' : '#c4783a',
                        }}>
                          {sub.status === 'active' ? 'Activo' : sub.status} — €{(sub.amount / 100).toFixed(2)}
                        </span>
                        {sub.latest_payment_intent && (
                          <button
                            onClick={() => handleRefund(sub.latest_payment_intent!, c.id)}
                            disabled={refunding === sub.latest_payment_intent}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.5rem',
                              background: 'rgba(239,68,68,0.15)',
                              border: '1px solid rgba(239,68,68,0.3)',
                              color: '#f87171',
                              cursor: 'pointer',
                            }}
                          >
                            {refunding === sub.latest_payment_intent ? 'Rimborso…' : 'Rimborsa'}
                          </button>
                        )}
                      </div>
                    ))}
                    {refundMsg?.id === c.id && (
                      <p style={{ fontSize: '0.75rem', color: '#4ade80', margin: 0 }}>{refundMsg.msg}</p>
                    )}
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

      {/* Utenti */}
      <div className="card">
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>
          Usuarios registrados
        </h2>
        {users.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Ningún usuario todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {users.map((u) => (
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

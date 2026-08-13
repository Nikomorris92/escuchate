'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AREA_MAP } from '@/lib/areas'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

interface StudentProfile {
  id: string
  full_name: string | null
  area_order: string[]
  total_score: number
  quiz_completed: boolean
}

interface Reflection {
  id: string
  area: string
  reflection_text: string
  score: number
  completed_at: string
}

interface JournalEntry {
  id: string
  area: string
  content: string
  entry_date: string
  created_at: string
}

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id as string

  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [studentEmail, setStudentEmail] = useState('')
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [journals, setJournals] = useState<JournalEntry[]>([])
  const [completedAreas, setCompletedAreas] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'progress' | 'reflections' | 'journal'>('progress')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) { router.push('/'); return }
      setAuthorized(true)

      const [profileRes, reflRes, journalRes, usersRes] = await Promise.all([
        supabase.from('user_profiles').select('id, full_name, area_order, total_score, quiz_completed').eq('id', studentId).single(),
        supabase.rpc('get_student_reflections', { student_id: studentId }),
        supabase.rpc('get_student_journal', { student_id: studentId }),
        supabase.from('admin_users').select('id, email').eq('id', studentId).single(),
      ])

      if (profileRes.data) setProfile(profileRes.data)
      if (reflRes.data) {
        setReflections(reflRes.data)
        setCompletedAreas(new Set(reflRes.data.map((r: Reflection) => r.area)))
      }
      if (journalRes.data) setJournals(journalRes.data)
      if (usersRes.data) setStudentEmail(usersRes.data.email ?? '')

      // Marca come lette tutte le notifiche di questo alunno
      const { data: unread } = await supabase
        .from('admin_notifications')
        .select('id')
        .eq('user_id', studentId)
        .eq('read', false)
      if (unread && unread.length > 0) {
        await supabase
          .from('admin_notifications')
          .update({ read: true })
          .eq('user_id', studentId)
      }

      setLoading(false)
    }
    load()
  }, [studentId, router])

  if (loading) return <div className="page-container"><p style={{ color: 'rgba(255,255,255,0.4)' }}>Cargando…</p></div>
  if (!authorized) return null

  const areaOrder = profile?.area_order ?? []
  const completedCount = completedAreas.size
  const totalAreas = areaOrder.length
  const percentage = totalAreas > 0 ? Math.round((completedCount / totalAreas) * 100) : 0

  const tabStyle = (tab: typeof activeTab) => ({
    padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500',
    cursor: 'pointer', border: 'none',
    background: activeTab === tab ? 'rgba(196,120,58,0.2)' : 'rgba(255,255,255,0.06)',
    color: activeTab === tab ? '#c4783a' : 'rgba(255,255,255,0.5)',
  })

  return (
    <div style={{ minHeight: '100dvh', padding: '2rem 1.5rem', maxWidth: '700px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', textDecoration: 'none' }}>
          ← Admin
        </Link>
      </div>

      {/* Card alunno */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.25rem' }}>
              {profile?.full_name ?? 'Senza nome'}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{studentEmail}</p>
          </div>
          <span style={{
            padding: '0.375rem 1rem', borderRadius: '9999px',
            background: 'rgba(196,120,58,0.15)', border: '1px solid rgba(196,120,58,0.3)',
            color: '#c4783a', fontSize: '0.875rem', fontWeight: '600',
          }}>
            {profile?.total_score ?? 0} pts
          </span>
        </div>

        {/* Barra progresso */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>
              {completedCount} di {totalAreas} aree completate
            </span>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: percentage === 100 ? '#4ade80' : '#c4783a' }}>
              {percentage}%
            </span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
            <div style={{
              height: '100%', borderRadius: '4px',
              background: percentage === 100 ? '#4ade80' : '#c4783a',
              width: `${percentage}%`, transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Tab */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button style={tabStyle('progress')} onClick={() => setActiveTab('progress')}>Percorso</button>
        <button style={tabStyle('reflections')} onClick={() => setActiveTab('reflections')}>
          Riflessioni ({reflections.length})
        </button>
        <button style={tabStyle('journal')} onClick={() => setActiveTab('journal')}>
          📓 Quaderno ({journals.length})
        </button>
      </div>

      {/* Tab: Percorso */}
      {activeTab === 'progress' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {areaOrder.map((areaId, i) => {
            const done = completedAreas.has(areaId)
            const areaReflection = reflections.find(r => r.area === areaId)
            return (
              <div key={areaId} style={{
                padding: '0.875rem 1.125rem',
                background: done ? 'rgba(74,222,128,0.06)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${done ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '0.75rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: done ? '#4ade80' : 'rgba(255,255,255,0.25)', width: '1.5rem', textAlign: 'center' }}>
                    {done ? '✓' : i + 1}
                  </span>
                  <div>
                    <p style={{ fontSize: '0.9375rem', color: '#ffffff', fontWeight: done ? '500' : '400', margin: 0 }}>
                      {AREA_MAP[areaId]?.title ?? areaId}
                    </p>
                    {done && areaReflection && (
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: '0.15rem 0 0' }}>
                        {new Date(areaReflection.completed_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}{areaReflection.score} pts
                      </p>
                    )}
                  </div>
                </div>
                {done && (
                  <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.625rem', borderRadius: '9999px', background: 'rgba(74,222,128,0.12)', color: '#4ade80', flexShrink: 0 }}>
                    Completata
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Riflessioni */}
      {activeTab === 'reflections' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {reflections.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '2rem 0' }}>Nessuna riflessione ancora.</p>
          ) : reflections.map((r) => (
            <div key={r.id} style={{
              padding: '1.125rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.875rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '0.6875rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
                  {AREA_MAP[r.area]?.title ?? r.area}
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)' }}>
                  {new Date(r.completed_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' · '}{r.score} pts
                </span>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', margin: 0 }}>
                {r.reflection_text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Quaderno */}
      {activeTab === 'journal' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {journals.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '2rem 0' }}>Nessuna nota nel quaderno ancora.</p>
          ) : journals.map((j) => (
            <div key={j.id} style={{
              padding: '1.125rem',
              background: 'rgba(196,120,58,0.05)',
              border: '1px solid rgba(196,120,58,0.15)',
              borderRadius: '0.875rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '0.6875rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
                  {AREA_MAP[j.area]?.title ?? j.area}
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)' }}>
                  {new Date(j.created_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' · '}{new Date(j.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', margin: 0 }}>
                {j.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

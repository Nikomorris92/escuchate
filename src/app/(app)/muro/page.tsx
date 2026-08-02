'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { AREA_MAP } from '@/lib/areas'
import { useRouter } from 'next/navigation'

interface Comment {
  id: string
  comment_text: string
  author_name: string | null
  created_at: string
  user_id: string
}

interface Reflection {
  id: string
  area: string
  reflection_text: string
  shared_name: string | null
  completed_at: string
  user_id: string
  comments?: Comment[]
  showComments?: boolean
  commentText?: string
  submitting?: boolean
}

export default function MuroPage() {
  const router = useRouter()
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [currentUserName, setCurrentUserName] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setCurrentUserId(user.id)

      const { data } = await supabase
        .from('level_progress')
        .select('id, area, reflection_text, shared_name, completed_at, user_id')
        .eq('is_shared', true)
        .order('completed_at', { ascending: false })
        .limit(50)

      setReflections((data ?? []).map(r => ({ ...r, comments: [], showComments: false, commentText: '' })))
      setLoading(false)
    }
    load()
  }, [router])

  const loadComments = useCallback(async (reflectionId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('reflection_comments')
      .select('id, comment_text, author_name, created_at, user_id')
      .eq('reflection_id', reflectionId)
      .order('created_at', { ascending: true })

    setReflections(prev => prev.map(r =>
      r.id === reflectionId ? { ...r, comments: data ?? [], showComments: true } : r
    ))
  }, [])

  const toggleComments = useCallback(async (reflection: Reflection) => {
    if (reflection.showComments) {
      setReflections(prev => prev.map(r => r.id === reflection.id ? { ...r, showComments: false } : r))
    } else {
      await loadComments(reflection.id)
    }
  }, [loadComments])

  const handleComment = useCallback(async (reflection: Reflection) => {
    const text = reflection.commentText?.trim()
    if (!text || !currentUserId) return

    setReflections(prev => prev.map(r => r.id === reflection.id ? { ...r, submitting: true } : r))

    const supabase = createClient()
    const { data, error } = await supabase
      .from('reflection_comments')
      .insert({
        reflection_id: reflection.id,
        user_id: currentUserId,
        comment_text: text,
        author_name: currentUserName.trim() || null,
      })
      .select('id, comment_text, author_name, created_at, user_id')
      .single()

    if (!error && data) {
      setReflections(prev => prev.map(r =>
        r.id === reflection.id
          ? { ...r, comments: [...(r.comments ?? []), data], commentText: '', submitting: false, showComments: true }
          : r
      ))
    } else {
      setReflections(prev => prev.map(r => r.id === reflection.id ? { ...r, submitting: false } : r))
    }
  }, [currentUserId, currentUserName])

  if (loading) {
    return (
      <div className="page-container">
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Cargando…</p>
      </div>
    )
  }

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
<div style={{ width: '100%', maxWidth: '480px' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Link href="/dashboard" className="btn-ghost" style={{ paddingLeft: 0 }}>← Dashboard</Link>
        </div>

        <h1 style={{ fontSize: '1.625rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.375rem' }}>
          Muro de reflexiones
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          Reflexiones reales de personas en su recorrido.
        </p>

        {/* Filtro per area */}
        {(() => {
          const areasPresenti = Array.from(new Set(reflections.map(r => r.area)))
          if (areasPresenti.length < 2) return null
          return (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setActiveFilters(new Set())}
                style={{
                  padding: '0.35rem 0.875rem',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  border: `1.5px solid ${activeFilters.size === 0 ? '#ffffff' : 'rgba(255,255,255,0.2)'}`,
                  background: activeFilters.size === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: activeFilters.size === 0 ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
              >
                Todas
              </button>
              {areasPresenti.map(areaId => {
                const active = activeFilters.has(areaId)
                return (
                  <button
                    key={areaId}
                    onClick={() => {
                      setActiveFilters(prev => {
                        const next = new Set(prev)
                        active ? next.delete(areaId) : next.add(areaId)
                        return next
                      })
                    }}
                    style={{
                      padding: '0.35rem 0.875rem',
                      borderRadius: '9999px',
                      fontSize: '0.8125rem',
                      border: `1.5px solid ${active ? '#c4783a' : 'rgba(255,255,255,0.2)'}`,
                      background: active ? 'rgba(196,120,58,0.15)' : 'transparent',
                      color: active ? '#c4783a' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                    }}
                  >
                    {AREA_MAP[areaId]?.title ?? areaId}
                  </button>
                )
              })}
            </div>
          )
        })()}

        {/* Nome di default per i commenti */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            className="input-field"
            style={{ fontSize: '0.875rem' }}
            type="text"
            placeholder="Tu nombre para los comentarios (opcional)"
            value={currentUserName}
            onChange={(e) => setCurrentUserName(e.target.value)}
            maxLength={40}
          />
        </div>

        {reflections.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.9375rem' }}>
            Todavía no hay reflexiones compartidas.<br />Sé el primero.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reflections.filter(r => activeFilters.size === 0 || activeFilters.has(r.area)).map((r) => {
              const area = AREA_MAP[r.area]
              const isOwn = r.user_id === currentUserId
              const commentCount = r.comments?.length ?? 0

              return (
                <div key={r.id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isOwn ? 'rgba(196,120,58,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '0.875rem',
                  overflow: 'hidden',
                }}>
                  {/* Riflessione */}
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#c4783a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {area?.title ?? r.area}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                        {r.shared_name || 'Anónimo'}{isOwn ? ' · tú' : ''}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', margin: '0 0 1rem' }}>
                      "{r.reflection_text}"
                    </p>

                    {/* Toggle commenti */}
                    <button
                      className="btn-ghost"
                      style={{ paddingLeft: 0, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}
                      onClick={() => toggleComments(r)}
                    >
                      {r.showComments
                        ? 'Ocultar comentarios'
                        : `💬 ${commentCount > 0 ? `${commentCount} comentario${commentCount > 1 ? 's' : ''}` : 'Responder'}`}
                    </button>
                  </div>

                  {/* Sezione commenti */}
                  {r.showComments && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.15)' }}>
                      {r.comments && r.comments.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                          {r.comments.map((c) => (
                            <div key={c.id} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
                                  {c.author_name || 'Anónimo'}{c.user_id === currentUserId ? ' · tú' : ''}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: '1.6' }}>
                                {c.comment_text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Nuovo commento */}
                      <textarea
                        className="reflection-textarea"
                        style={{ minHeight: '80px', fontSize: '0.875rem' }}
                        placeholder="Escribe tu respuesta…"
                        value={r.commentText ?? ''}
                        onChange={(e) => setReflections(prev => prev.map(x =>
                          x.id === r.id ? { ...x, commentText: e.target.value } : x
                        ))}
                      />
                      <button
                        className="btn-primary"
                        style={{ marginTop: '0.75rem' }}
                        onClick={() => handleComment(r)}
                        disabled={!r.commentText?.trim() || r.submitting}
                      >
                        {r.submitting ? 'Enviando…' : 'Enviar respuesta'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <p className="disclaimer" style={{ marginTop: '2rem' }}>
          Las reflexiones y comentarios son anónimos por defecto.<br />
          Esta no es una red social — es un espacio de crecimiento compartido.
        </p>
      </div>
    </div>
  )
}

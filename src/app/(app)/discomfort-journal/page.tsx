'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/LangContext'

type Entry = { id: string; entry_text: string; created_at: string }

export default function DiscomfortJournalPage() {
  const router = useRouter()
  const { lang } = useLang()
  const [entries, setEntries] = useState<Entry[]>([])
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase
        .from('discomfort_journal')
        .select('id, entry_text, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setEntries(data ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleSave() {
    if (!text.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('discomfort_journal')
      .insert({ user_id: user.id, entry_text: text.trim() })
      .select()
      .single()

    if (!error && data) {
      setEntries([data, ...entries])
      setText('')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('discomfort_journal').delete().eq('id', id)
    setEntries(entries.filter(e => e.id !== id))
  }

  function formatDate(iso: string) {
    const d = new Date(iso)
    return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  if (loading) return null

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', cursor: 'pointer', padding: 0, marginBottom: '1.5rem' }}>
          ← {lang === 'en' ? 'Back' : 'Volver'}
        </button>

        <h1 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.375rem' }}>
          📓 {lang === 'en' ? 'Discomfort Journal' : 'Cuaderno de la incomodidad'}
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: '1.6' }}>
          {lang === 'en'
            ? 'Write down every uncomfortable situation you faced today. Big or small — what matters is that it was real.'
            : 'Apunta cada situación incómoda a la que hiciste frente hoy. Grande o pequeña — lo que importa es que fue real.'}
        </p>

        {/* Input */}
        <div style={{ marginBottom: '2rem' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={lang === 'en' ? 'What did you face today?' : '¿Qué afrontaste hoy?'}
            rows={4}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.75rem', color: '#ffffff', fontSize: '0.9375rem',
              padding: '0.875rem 1rem', resize: 'vertical', outline: 'none',
              fontFamily: 'inherit', lineHeight: '1.6',
            }}
          />
          <button
            onClick={handleSave}
            disabled={saving || !text.trim()}
            className="btn-primary"
            style={{ marginTop: '0.75rem', width: '100%' }}
          >
            {saving ? (lang === 'en' ? 'Saving…' : 'Guardando…') : (lang === 'en' ? 'Save entry' : 'Guardar')}
          </button>
        </div>

        {/* Entries */}
        {entries.length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            {lang === 'en' ? 'No entries yet. Start today.' : 'Ninguna entrada todavía. Empieza hoy.'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {entries.map(entry => (
              <div key={entry.id} style={{
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.875rem',
              }}>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                  {formatDate(entry.created_at)}
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.65', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {entry.entry_text}
                </p>
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', cursor: 'pointer', padding: 0, marginTop: '0.75rem' }}
                >
                  {lang === 'en' ? 'Delete' : 'Eliminar'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

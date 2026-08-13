import { createClient as createServiceClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })

  const { area, content } = await request.json()
  if (!area || !content?.trim()) return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })

  const { data, error } = await supabase
    .from('coaching_journal')
    .insert({ user_id: user.id, area, content: content.trim(), entry_date: new Date().toISOString().split('T')[0] })
    .select('id, content, entry_date, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Crea notifica admin con service role
  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  await service.from('admin_notifications').insert({
    type: 'journal_entry',
    user_id: user.id,
    user_email: user.email,
    area,
    message: `${user.email} ha scritto nel quaderno: ${area}`,
    read: false,
  })

  return NextResponse.json({ entry: data })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })

  const area = request.nextUrl.searchParams.get('area')
  let query = supabase
    .from('coaching_journal')
    .select('id, area, content, entry_date, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (area) query = query.eq('area', area)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ entries: data })
}

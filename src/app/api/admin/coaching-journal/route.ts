import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'nicola.morea92@gmail.com') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const { data, error } = await supabase.rpc('get_all_coaching_journals')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ entries: data ?? [] })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'nicola.morea92@gmail.com') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const { ids } = await request.json()
  await supabase.from('admin_notifications').update({ read: true }).in('id', ids)

  return NextResponse.json({ success: true })
}

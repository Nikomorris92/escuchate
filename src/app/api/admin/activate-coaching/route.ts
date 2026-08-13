import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'nicola.morea92@gmail.com') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email mancante' }, { status: 400 })

  const { error } = await supabase.rpc('activate_coaching_by_email', { target_email: email.toLowerCase().trim() })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

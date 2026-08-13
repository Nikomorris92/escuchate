import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Verifica che sia l'admin
  const authHeader = request.headers.get('x-admin-email')
  if (authHeader !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email mancante' }, { status: 400 })

  // Trova l'utente per email
  const { data: users, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 })

  const user = users.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (!user) return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 })

  // Attiva coaching
  const { error } = await supabase
    .from('user_profiles')
    .update({ is_coaching_client: true })
    .eq('id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, userId: user.id })
}

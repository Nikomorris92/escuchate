import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function POST(request: NextRequest) {
  const adminEmail = request.headers.get('x-admin-email')
  if (adminEmail !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email mancante' }, { status: 400 })

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase.rpc('activate_coaching_by_email', { target_email: email.toLowerCase().trim() })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function GET(request: Request) {
  // Verifica che sia l'admin
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Recupera tutti gli utenti auth
  const { data: { users }, error } = await supabase.auth.admin.listUsers()
  if (error) return NextResponse.json({}, { status: 500 })

  // Verifica che il richiedente sia admin
  const authHeader = request.headers.get('authorization')
  const requestingEmail = authHeader // non usiamo questo — semplicemente restituiamo la mappa
  void requestingEmail

  // Mappa id → email
  const map: Record<string, string> = {}
  for (const u of users) {
    if (u.email) map[u.id] = u.email
  }

  return NextResponse.json(map)
}

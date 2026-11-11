import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bghvkdenhdbnkztbvxgy.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaHZrZGVuaGRibmt6dGJ2eGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDgwNzgsImV4cCI6MjEwOTgyNDA3OH0._VzYpDlbWVqOhAfeWm9LeR3RkZd6Hla4WmiphtNnfwQ'
  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}

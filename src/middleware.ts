import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    'https://bghvkdenhdbnkztbvxgy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaHZrZGVuaGRibmt6dGJ2eGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDgwNzgsImV4cCI6MjEwOTgyNDA3OH0._VzYpDlbWVqOhAfeWm9LeR3RkZd6Hla4WmiphtNnfwQ',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const publicPaths = ['/login', '/signup', '/', '/preview', '/auth/confirm', '/auth/reset-password', '/forgot-password', '/quiz', '/api/checkout', '/api/webhook', '/api/deploy-notify']
  const isPublic = publicPaths.some((p) => pathname === p)

  if (!user && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bghvkdenhdbnkztbvxgy.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaHZrZGVuaGRibmt6dGJ2eGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDgwNzgsImV4cCI6MjEwOTgyNDA3OH0._VzYpDlbWVqOhAfeWm9LeR3RkZd6Hla4WmiphtNnfwQ'
  return createBrowserClient(url, key)
}
// cache bust Wed Nov 11 20:20:12 CET 2026

import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = 'https://bghvkdenhdbnkztbvxgy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaHZrZGVuaGRibmt6dGJ2eGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDgwNzgsImV4cCI6MjEwOTgyNDA3OH0._VzYpDlbWVqOhAfeWm9LeR3RkZd6Hla4WmiphtNnfwQ'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
// cache bust Wed Nov 11 20:20:12 CET 2026

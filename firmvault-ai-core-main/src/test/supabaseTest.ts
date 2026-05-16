// src/test/supabaseTest.ts

import { supabase } from '../lib/supabase'

export async function testConnection() {
  const { data, error } = await supabase.from('intakes').select('*').limit(1)

  if (error) {
    console.error('Supabase error:', error)
  } else {
    console.log('Supabase connected:', data)
  }
}
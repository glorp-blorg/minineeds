import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from your Supabase schema)
export interface VendingMachine {
  id: string
  airport_code: string
  airport_name: string
  terminal: string
  location: string
  hours: string
  supplies: string[]
  rating: number
  status: 'active' | 'maintenance' | 'inactive'
  created_at: string
  updated_at: string
}

export interface LocationRequest {
  id: string
  name: string
  email: string
  airport: string
  message?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface ContactInformation {
  id: string
  email: string
  name: string
  phone_number: string
}
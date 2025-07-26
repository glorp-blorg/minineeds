import { supabase } from './supabase'
import type { VendingMachine, LocationRequest, ContactInformation } from './supabase'

// Vending Machine API functions
export const vendingMachineApi = {
  async getAll(): Promise<VendingMachine[]> {
    const { data, error } = await supabase
      .from('vending_machine')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async searchByAirport(query: string): Promise<VendingMachine[]> {
    const { data, error } = await supabase
      .from('vending_machine')
      .select('*')
      .or(`airport_code.ilike.%${query}%,airport_name.ilike.%${query}%`)
      .eq('status', 'active')

    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<VendingMachine | null> {
    const { data, error } = await supabase
      .from('vending_machine')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }
}

export const locationRequestApi = {
  async create(
    request: Omit<LocationRequest, 'id' | 'status' | 'created_at'>
  ): Promise<LocationRequest> {
    const { data, error } = await supabase
      .from('location_request')
      .insert([
        { ...request, status: 'pending' }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getAll(): Promise<LocationRequest[]> {
    const { data, error } = await supabase
      .from('location_request')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async updateStatus(
    id: string,
    status: LocationRequest['status']
  ): Promise<void> {
    const { error } = await supabase
      .from('location_request')
      .update({ status })
      .eq('id', id)

    if (error) throw error
  }
}

export const analyticsApi = {
  async getPopularAirports(limit: number = 10) {
    const { data, error } = await supabase
      .from('vending_machine')
      .select('airport_code, airport_name')
      .eq('status', 'active')
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async getRequestStats() {
    const { data, error } = await supabase
      .from('location_request')
      .select('status')

    if (error) throw error

    const stats = data?.reduce((acc, request) => {
      acc[request.status] = (acc[request.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      total: data?.length || 0,
      pending: stats?.pending || 0,
      approved: stats?.approved || 0,
      rejected: stats?.rejected || 0
    }
  }
}

// 💡 Moved outside and correctly structured
export const insertEmail = async (email: string): Promise<ContactInformation[]> => {
  const { data, error } = await supabase
    .from('contact_information')
    .insert([{ email }])
    .select()

  if (error) throw error
  return data || []
}

// Real-time subscriptions
export const subscriptions = {
  subscribeToMachines(callback: (payload: any) => void) {
    return supabase
      .channel('vending_machine')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vending_machine' },
        callback
      )
      .subscribe()
  },

  subscribeToRequests(callback: (payload: any) => void) {
    return supabase
      .channel('location_request')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'location_request' },
        callback
      )
      .subscribe()
  }
}
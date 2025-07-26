import { supabase } from './supabase'
import type { VendingMachine, LocationRequest, Supply } from './supabase'

// Vending Machine API functions
export const vendingMachineApi = {
  // Get all vending machines
  async getAll(): Promise<VendingMachine[]> {
    const { data, error } = await supabase
      .from('vending_machines')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Search vending machines by airport
  async searchByAirport(query: string): Promise<VendingMachine[]> {
    const { data, error } = await supabase
      .from('vending_machines')
      .select('*')
      .or(`airport_code.ilike.%${query}%,airport_name.ilike.%${query}%`)
      .eq('status', 'active')
      .order('rating', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get vending machine by ID
  async getById(id: string): Promise<VendingMachine | null> {
    const { data, error } = await supabase
      .from('vending_machines')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Update vending machine rating
  async updateRating(id: string, rating: number): Promise<void> {
    const { error } = await supabase
      .from('vending_machines')
      .update({ rating })
      .eq('id', id)

    if (error) throw error
  }
}

// Location Request API functions
export const locationRequestApi = {
  // Submit a new location request
  async create(request: Omit<LocationRequest, 'id' | 'status' | 'created_at'>): Promise<LocationRequest> {
    const { data, error } = await supabase
      .from('location_requests')
      .insert([{
        ...request,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all location requests (admin function)
  async getAll(): Promise<LocationRequest[]> {
    const { data, error } = await supabase
      .from('location_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Update request status (admin function)
  async updateStatus(id: string, status: LocationRequest['status']): Promise<void> {
    const { error } = await supabase
      .from('location_requests')
      .update({ status })
      .eq('id', id)

    if (error) throw error
  }
}

// Supply API functions
export const supplyApi = {
  // Get supplies for a vending machine
  async getByMachineId(machineId: string): Promise<Supply[]> {
    const { data, error } = await supabase
      .from('supplies')
      .select('*')
      .eq('vending_machine_id', machineId)
      .order('category', { ascending: true })

    if (error) throw error
    return data || []
  },

  // Update supply stock level
  async updateStock(id: string, stockLevel: number): Promise<void> {
    const { error } = await supabase
      .from('supplies')
      .update({ stock_level: stockLevel })
      .eq('id', id)

    if (error) throw error
  },

  // Get low stock supplies
  async getLowStock(threshold: number = 5): Promise<Supply[]> {
    const { data, error } = await supabase
      .from('supplies')
      .select('*, vending_machines(*)')
      .lt('stock_level', threshold)
      .order('stock_level', { ascending: true })

    if (error) throw error
    return data || []
  }
}

// Analytics API functions
export const analyticsApi = {
  // Get popular airports
  async getPopularAirports(limit: number = 10) {
    const { data, error } = await supabase
      .from('vending_machines')
      .select('airport_code, airport_name, rating')
      .eq('status', 'active')
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Get request statistics
  async getRequestStats() {
    const { data, error } = await supabase
      .from('location_requests')
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

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to vending machine updates
  subscribeToMachines(callback: (payload: any) => void) {
    return supabase
      .channel('vending_machines')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vending_machines' }, 
        callback
      )
      .subscribe()
  },

  // Subscribe to location request updates
  subscribeToRequests(callback: (payload: any) => void) {
    return supabase
      .channel('location_requests')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'location_requests' }, 
        callback
      )
      .subscribe()
  }
}
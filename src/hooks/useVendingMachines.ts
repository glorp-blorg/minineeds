import { useState, useEffect } from 'react'
import { vendingMachineApi } from '@/lib/api'
import type { VendingMachine } from '@/lib/supabase'

export const useVendingMachines = () => {
  const [machines, setMachines] = useState<VendingMachine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMachines = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await vendingMachineApi.getAll()
      setMachines(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vending machines')
    } finally {
      setLoading(false)
    }
  }

  const searchMachines = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await vendingMachineApi.searchByAirport(query)
      setMachines(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search vending machines')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMachines()
  }, [])

  return {
    machines,
    loading,
    error,
    refetch: fetchMachines,
    searchMachines
  }
}
import { useState } from 'react'
import { locationRequestApi } from '@/lib/api'
import type { LocationRequest } from '@/lib/supabase'

export const useLocationRequests = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitRequest = async (
    requestData: Omit<LocationRequest, 'id' | 'status' | 'created_at'>
  ): Promise<LocationRequest | null> => {
    try {
      setLoading(true)
      setError(null)
      const data = await locationRequestApi.create(requestData)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    submitRequest
  }
}
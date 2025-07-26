import { useState, useEffect } from 'react'
import { analyticsApi } from '@/lib/api'

export const usePopularAirports = (limit: number = 10) => {
  const [airports, setAirports] = useState<Array<{airport_code: string, airport_name: string}>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPopularAirports = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await analyticsApi.getPopularAirports(limit)
      setAirports(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch popular airports')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularAirports()
  }, [limit])

  return {
    airports,
    loading,
    error,
    refetch: fetchPopularAirports
  }
} 
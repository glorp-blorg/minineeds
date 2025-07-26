import { useState, useEffect } from 'react'
import { analyticsApi } from '@/lib/api'

interface RequestStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export const useRequestStats = () => {
  const [stats, setStats] = useState<RequestStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await analyticsApi.getRequestStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch request stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
} 
import { useState, useEffect } from 'react'
import { vendingMachineApi } from '@/lib/api'
import type { VendingMachine } from '@/lib/supabase'

export const useVendingMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMachines = async (query: string) => {
    try {
      setLoading(true);
      const data = await vendingMachineApi.searchByAirport(query);
      setMachines(data);
    } catch (err: any) {
      setError(err.message || 'Failed to search machines');
    } finally {
      setLoading(false);
    }
  };

  return { machines, loading, error, searchMachines };
};
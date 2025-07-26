import { useMemo } from 'react'
import { useVendingMachines } from './useVendingMachines'
import { Milk, Package, Apple, Gift } from 'lucide-react'

interface SupplyItem {
  icon: any
  name: string
  description: string
  count: number
}

export const useSupplyData = () => {
  const { machines } = useVendingMachines()

  const supplyData = useMemo(() => {
    const supplyCounts: Record<string, number> = {}
    
    // Count all supplies across all machines
    machines.forEach(machine => {
      machine.supplies.forEach(supply => {
        supplyCounts[supply] = (supplyCounts[supply] || 0) + 1
      })
    })

    // Get the most common supplies
    const topSupplies = Object.entries(supplyCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4)
      .map(([supply, count]) => ({ supply, count }))

    // Map supplies to icons and descriptions
    const supplyMap: Record<string, { icon: any, description: string }> = {
      'Baby Formula': { icon: Milk, description: 'Infant and toddler formulas' },
      'Diapers': { icon: Package, description: 'Various sizes available' },
      'Baby Food': { icon: Apple, description: 'Pouches and jars' },
      'Pacifiers': { icon: Gift, description: 'Different sizes and styles' },
      'Wipes': { icon: Package, description: 'Gentle cleaning wipes' },
      'Bottles': { icon: Milk, description: 'Feeding bottles' },
      'Toys': { icon: Gift, description: 'Safe travel toys' },
      'Clothing': { icon: Package, description: 'Emergency clothing' }
    }

    return topSupplies.map(({ supply, count }) => ({
      icon: supplyMap[supply]?.icon || Package,
      name: supply,
      description: supplyMap[supply]?.description || 'Essential baby supplies',
      count
    }))
  }, [machines])

  return supplyData
} 
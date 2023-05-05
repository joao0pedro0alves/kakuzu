import { useMemo } from 'react'
import { useTransactionsContext } from '@/contexts/Transactions'
import { sortByScheduleAt, createLabels, createChartDataSets } from '@/utils/charts'

import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Line as LineChart } from 'react-chartjs-2'

Chart.register(CategoryScale)

export function FollowUpTransactions() {
  const [{ data }] = useTransactionsContext()

  const chartData = useMemo(() => {
    
    const sortedData = sortByScheduleAt(data)
    const labels = createLabels(sortedData)
    const [receives, expenses, balance] = createChartDataSets(sortedData)

    return {
      labels,
      datasets: [
        {
          // fill: true,
          label: 'Entradas',
          data: receives,
          backgroundColor: 'rgba(34, 197, 94, 0.4)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 2,
        },
        {
          // fill: true,
          label: 'Saídas',
          data: expenses,
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 2,
        },
        {
          // fill: true,
          label: 'Saldo',
          data: balance,
          backgroundColor: 'rgba(59, 130, 246, 0.25)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
        },
      ],
    }
  }, [data])

  return (
      <LineChart
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Acompanhamento do saldo / transações',
            },
          },
        }}
      />
  )
}

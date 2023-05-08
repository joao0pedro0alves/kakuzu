import { useMemo } from 'react'
import { sum } from 'ramda'
import clsx from 'clsx'

import { useTransactionsContext } from '@/contexts/Transactions'
import { currencyFormatter, dateFormatter } from '@/utils/formatter'
import { isScheduled } from '@/utils/date-fns'
import { FollowUpTransactions } from "@/components/charts/FollowUpTransactions"
import { VisibleText } from '@/components/utils/VisibleText'

export function HomePage() {
  const { state: { data }, getExpenses, getReceives } = useTransactionsContext()

  const dailyBalance = useMemo(() => {
    const lastTransactions = data.filter(item => !isScheduled(item.scheduledAt))
    const receives = sum(getReceives(lastTransactions).map(item => item.valueInCents / 100))
    const expenses = sum(getExpenses(lastTransactions).map(item => item.valueInCents / 100))
    return receives - expenses
  }, [data])

  const scheduledBalance = useMemo(() => {
    const receives = sum(getReceives().map(item => item.valueInCents / 100))
    const expenses = sum(getExpenses().map(item => item.valueInCents / 100))
    return receives - expenses
  }, [data])

  function getDateWithMoreExpenses() {
    const sortedExpenses = getExpenses().sort((a, b) => b.valueInCents - a.valueInCents)
    return sortedExpenses[0]?.scheduledAt || new Date()
  }

  return (
    <section>
      <div className="grid grid-cols-3 max-md:grid-rows-3 grid-flow-col md:grid-flow-row gap-4 mb-4">
        <div className="max-md:col-span-3 p-4 flex flex-col items-center justify-center shadow rounded bg-gray-100 dark:bg-gray-700/50">
          <span className="text-sm text-left text-gray-700 dark:text-gray-300">Saldo atual</span>
          <span className={clsx("font-bold text-3xl", dailyBalance > 0 ? 'text-green-500' : 'text-red-500')}>
            <VisibleText value={currencyFormatter(dailyBalance)} />
          </span>
        </div>
        <div className="max-md:col-span-3 p-4 flex flex-col items-center justify-center shadow rounded bg-gray-100 dark:bg-gray-700/50">
          <span className="text-sm text-left text-gray-700 dark:text-gray-300">Saldo agendado</span>
          <span className={clsx("font-bold text-3xl", dailyBalance > 0 ? 'text-green-500' : 'text-red-500')}>
            <VisibleText value={currencyFormatter(scheduledBalance)} />
          </span>
        </div>
        <div className="max-md:col-span-3 p-4 flex flex-col items-center justify-center shadow rounded bg-gray-100 dark:bg-gray-700/50">
          <span className="text-sm text-left text-gray-700 dark:text-gray-300">Dia com mais saídas</span>
          <span className="font-bold text-3xl text-red-500">{dateFormatter(getDateWithMoreExpenses())}</span>
        </div>
      </div>

      <div>
        <FollowUpTransactions 
          data={data}
        />
      </div>
    </section>
  )
}

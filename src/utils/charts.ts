import { Transaction } from '@/@types/dto'
import { dateFormatter } from '@/utils/formatter'

import { groupWith, sum } from 'ramda'
import { isSameDay } from 'date-fns'

export const sortByScheduleAt = (data: Transaction[]) =>
  data.sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())

export const createLabels = (data: Transaction[]) => [
  ...new Set(data.map((item) => dateFormatter(item.scheduledAt))),
]

export const sumType = (type: Transaction['type'], data: Transaction[]) =>
  sum(
    data
      .filter((item) => item.type === type)
      .map((item) => item.valueInCents / 100)
  )

export function createChartDataSets(transactions: Transaction[]) {

  const groupedTransactions = groupWith(
    (a, b) => isSameDay(a.scheduledAt, b.scheduledAt),
    transactions
  )

  const receivesAndExpensesPerDate = groupedTransactions.flatMap(
    (transactionsOfDay) => [
      sumType('SAIDA', transactionsOfDay),
      sumType('ENTRADA', transactionsOfDay),
    ]
  )

  // ==== EXPENSES, RECEIVES ====

  const expenses = receivesAndExpensesPerDate.filter((_, i) => i % 2 === 0)
  const receives = receivesAndExpensesPerDate.filter((_, i) => i % 2 !== 0)

  // ==== CALCULATE DAILY BALANCE ====

  let memoizedBalance = 0
  let balancePerDay: number[] = []

  receives.forEach((receive, index) => {
    const dailyBalance = memoizedBalance + receive - expenses[index]
    balancePerDay.push(dailyBalance)
    memoizedBalance = dailyBalance
  })

  return [receives, expenses, balancePerDay]
}

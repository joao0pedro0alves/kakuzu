import { Calculator } from '@/components/layout/Calculator'
import { TransactionList } from '@/components/layout/TransactionList'
import { useTransactionsContext } from '@/contexts/Transactions'

export function Transactions() {
  const [{ data }] = useTransactionsContext()

  function isScheduled(date: Date) {
    return date >= new Date()
  }

  const sortedTransactions = data.sort((a, b) => {
    return a.scheduledAt.getTime() - b.scheduledAt.getTime()
  })

  const scheduledTransactions = sortedTransactions.filter(({ scheduledAt }) =>
    isScheduled(scheduledAt)
  )

  const lastTransactions = sortedTransactions.filter(
    ({ scheduledAt }) => !isScheduled(scheduledAt)
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex gap-4">
        <TransactionList title="Last transactions" data={lastTransactions} />
        <TransactionList title="Scheduled transactions" data={scheduledTransactions} />
      </div>
      <Calculator transactions={lastTransactions} />
    </div>
  )
}

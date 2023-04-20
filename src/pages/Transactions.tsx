import { TransactionList } from '@/components/layout/TransactionList'
import { transactions } from '@/sample/transactions'

export function Transactions() {
  function isScheduled(date: Date) {
    return date >= new Date()
  }

  const sortedTransactions = transactions.sort((a, b) => {
    return a.scheduledAt.getTime() - b.scheduledAt.getTime()
  })

  const scheduledTransactions = sortedTransactions.filter(({ scheduledAt }) =>
    isScheduled(scheduledAt)
  )
  
  const lastTransactions = sortedTransactions.filter(
    ({ scheduledAt }) => !isScheduled(scheduledAt)
  )

  return (
    <div className="flex gap-4">
      <TransactionList 
        data={lastTransactions} 
        title="Last transactions" 
      />
      <TransactionList
        data={scheduledTransactions}
        title="Scheduled transactions"
      />
    </div>
  )
}

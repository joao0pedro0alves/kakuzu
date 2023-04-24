import { Calculator } from '@/components/layout/Calculator'
import { TransactionList } from '@/components/layout/TransactionList'
import { TransactionForm } from '@/components/forms/TransactionForm'
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
        <TransactionList title="Últimas transações" data={lastTransactions} />
        <TransactionList title="Transações agendadas" data={scheduledTransactions} />
      </div>

      <TransactionForm onSave={console.log} />
      <Calculator transactions={lastTransactions} />
    </div>
  )
}

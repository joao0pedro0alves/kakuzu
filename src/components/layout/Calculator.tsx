import { Transaction } from "@/@types/dto"
import { currencyFormatter } from '@/services/formatter'

interface CalculatorProps {
  transactions: Transaction[]
}

export function Calculator({ transactions }: CalculatorProps) {

  function sumTransactionValues(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => acc + (transaction.valueInCents / 100), 0)
  }

  const receives = sumTransactionValues(transactions.filter(transaction => transaction.type === 'ENTRADA'))
  const expenses = sumTransactionValues(transactions.filter(transaction => transaction.type === 'SAIDA'))

  return (
    <footer className="rounded-md bg-gray-100 dark:bg-gray-700 p-4 grid grid-cols-3">
      <div className="flex flex-col">
        <span>Receives</span>
        <span className="font-black text-3xl">{currencyFormatter.format(receives)}</span>
      </div>
      <div className="flex flex-col">
        <span>Expenses</span>
        <span className="font-black text-3xl">{currencyFormatter.format(expenses)}</span>
      </div>
      <div className="flex flex-col">
        <span>Balance</span>
        <span className="font-black text-3xl">{currencyFormatter.format(receives - expenses)}</span>
      </div>
    </footer>
  )
}
import clsx from 'clsx'
import { Transaction } from '@/@types/dto'
import { currencyFormatter } from '@/utils/formatter'
import { VisibleText } from '@/components/utils/VisibleText'

interface CalculatorProps {
  transactions: Transaction[]
}

export function Calculator({ transactions }: CalculatorProps) {
  const sum = (transactions: Transaction[]) =>
    transactions.reduce((acc, { valueInCents }) => acc + valueInCents / 100, 0)

  const typeIs = (type: Transaction['type']) => (transaction: Transaction) =>
    transaction.type === type && transaction.active
  
  const receives = sum(transactions.filter(typeIs('ENTRADA')))
  const expenses = sum(transactions.filter(typeIs('SAIDA')))
  const balance = receives - expenses

  return (
    <footer className="rounded-md bg-gray-100 dark:bg-gray-700 p-4 grid grid-cols-3">
      <div className="flex flex-col">
        <span>Entradas</span>
        <span className="font-black md:text-3xl">
          <VisibleText value={currencyFormatter(receives)} />
        </span>
      </div>
      <div className="flex flex-col">
        <span>Saídas</span>
        <span
          className={clsx('font-black md:text-3xl', {
            'text-red-500': expenses > 0,
          })}
        >
          <VisibleText value={currencyFormatter(-expenses)} />
        </span>
      </div>
      <div className="flex flex-col">
        <span>Saldo</span>
        <span
          className={clsx('font-black md:text-3xl', {
            ['text-red-500']: balance < 0,
            ['text-green-500']: balance > 0,
          })}
        >
          <VisibleText value={currencyFormatter(balance)} />
        </span>
      </div>
    </footer>
  )
}

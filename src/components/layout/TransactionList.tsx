import clsx from 'clsx'
import { isSameDay } from 'date-fns'
import { Transaction } from '../utils/Transaction'
import * as DTO from '@/@types/dto'
import { MinusCircle, PlusCircle } from 'phosphor-react'

interface TransactionListProps {
  title: string
  data: DTO.Transaction[]
  onRemoveItem: (id: DTO.Transaction['id']) => void
  onChangeItem: (transaction: DTO.Transaction) => void

  includedOnCalculator?: boolean
  onClickPlus?: () => void
  onClickMinus?: () => void
}

function sortTransactions(transactions: DTO.Transaction[]) {
  const comp = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0)

  return transactions.sort((a, b) => {
    if (isSameDay(a.scheduledAt, b.scheduledAt)) return comp(a.type, b.type)
    return comp(a.scheduledAt.getTime(), b.scheduledAt.getTime())
  })
}


export function TransactionList({
  title,
  data,
  includedOnCalculator,
  onClickMinus,
  onClickPlus,
  onRemoveItem,
  onChangeItem,
}: TransactionListProps) {
  return (
    <section className="md:flex-1 md:max-h-[70vh] pr-2 overflow-auto scrollbar-thin scrollbar-rounded-md scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <h2 className="text-xl font-bold flex items-center gap-4">
        <span>{title}</span>
        {includedOnCalculator !== undefined && (
          <>
            {includedOnCalculator ? (
              <button
                title="Remover do cálculo"
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-full"
                onClick={onClickMinus}
              >
                <MinusCircle />
              </button>
            ) : (
              <button
                title="Incluir no cálculo"
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-full"
                onClick={onClickPlus}
              >
                <PlusCircle />
              </button>
            )}
          </>
        )}
      </h2>

      <div className="mt-4">
        <ul className={
          clsx(
            "flex flex-col gap-2",
            {
              'hidden md:flex': includedOnCalculator === false
            }
          )
        }>
          {sortTransactions(data).map((transaction, index) => (
            <Transaction
              data={transaction}
              key={'transaction-' + transaction.id}
              onRemove={() => onRemoveItem(transaction.id)}
              onEdit={() => onChangeItem(transaction)}
              className={`md:animate-[listItemShow_300ms_ease-in-out_forwards]`}
              style={{
                animationDelay: `${index}00ms`,
              }}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

import { Transaction } from '../utils/Transaction'
import * as DTO from '@/@types/dto'

interface TransactionListProps {
  title: string
  data: DTO.Transaction[]
  onRemoveItem: (id: DTO.Transaction['id']) => void
  onChangeItem: (transaction: DTO.Transaction) => void
}

export function TransactionList({ title, data, onRemoveItem, onChangeItem }: TransactionListProps) {
  return (
    <section className="flex-1 max-h-[70vh] pr-2 overflow-auto scrollbar-thin scrollbar-rounded-md scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-4">
        <ul className="flex flex-col gap-2">

          {data.map((transaction) => 
            <Transaction
              data={transaction}
              key={'transaction-' + transaction.id}
              onRemove={() => onRemoveItem(transaction.id)}
              onEdit={() => onChangeItem(transaction)}
            />
          )}

        </ul>
      </div>
    </section>
  )
}

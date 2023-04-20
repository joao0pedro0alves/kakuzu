import { Transaction } from '../utils/Transaction'
import * as DTO from '@/@types/dto';

interface TransactionListProps {
  title: string;
  data: DTO.Transaction[]
}

export function TransactionList({ title, data }: TransactionListProps) {
  return (
    <section className="flex-1">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-4">
        <ul className="flex flex-col gap-2">

          {data.map((transaction) => 
            <Transaction
              data={transaction}
              key={'transaction-' + transaction.id}
            />
          )}

        </ul>
      </div>
    </section>
  )
}

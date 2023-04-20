import clsx from 'clsx'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import { FiMoreVertical } from 'react-icons/fi'

import { currencyFormatter, dateFormatter } from '@/services/formatter'
import { Transaction as TransactionDto } from '@/@types/dto'

interface TransactionProps {
  data: TransactionDto
}

export function Transaction({ data }: TransactionProps) {
  const isExpense = data.type === 'SAIDA'

  return (
    <li
      className={clsx(
        'grid grid-cols-12 gap-4 items-center p-4 rounded-md shadow-md',
        isExpense
          ? 'dark:bg-red-800 dark:border-red-700'
          : 'dark:bg-green-800 dark:border-green-700'
      )}
    >
      <div className="col-span-1 flex items-center justify-center">
        <span
          className={clsx(
            'p-2 rounded-full text-white',
            isExpense ? 'bg-red-500 dark:bg-red-700' : 'bg-green-500 dark:bg-green-700'
          )}
        >
          {isExpense ? (
            <BsFillArrowDownCircleFill size={20} />
          ) : (
            <BsFillArrowUpCircleFill size={20} />
          )}
        </span>
      </div>

      <div className="col-span-7 flex flex-col">
        <span className="text-sm uppercase font-semibold">{data.description}</span>
        <span className="text-xs text-gray-500 dark:text-gray-300">{dateFormatter(data.scheduledAt)}</span>
      </div>

      <div className="col-span-3 flex justify-end">
        <span className='font-black text-xl'>
          {currencyFormatter.format(data.valueInCents / 100)}
        </span>
      </div>

      <div className="col-span-1 flex items-center justify-center">
        <button>
          <FiMoreVertical size={20} />
        </button>
      </div>
    </li>
  )
}

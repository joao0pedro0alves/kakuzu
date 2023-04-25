import clsx from 'clsx'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import { FiMoreVertical } from 'react-icons/fi'
import * as Menu from '@radix-ui/react-dropdown-menu'

import { currencyFormatter, dateFormatter } from '@/services/formatter'
import { Transaction as TransactionDto } from '@/@types/dto'
import { useVisibleContext } from '@/contexts/Visible'
import { CSSProperties } from 'react'

interface TransactionProps {
  data: TransactionDto
  onRemove: () => void
  onEdit: () => void
  className?: string;
  style?: CSSProperties
}

export function Transaction({ data, className, style, onRemove, onEdit }: TransactionProps) {
  const [visible] = useVisibleContext()
  const isExpense = data.type === 'SAIDA'

  return (
    <li
      style={style}
      className={clsx(
        className,
        'grid grid-cols-12 gap-4 items-center p-4 rounded-md shadow-md',
        isExpense
          ? 'bg-red-100 dark:bg-red-800'
          : 'bg-green-100 dark:bg-green-800'
      )}
    >
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
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

      <div className="col-span-6 md:col-span-7 flex flex-col">
        <span className="text-sm uppercase font-semibold">{data.description}</span>
        <span className="text-xs text-gray-500 dark:text-gray-300">{dateFormatter(data.scheduledAt)}</span>
      </div>

      <div className="col-span-3 flex justify-end">
        <span className='font-black text-lg md:text-xl'>
          {visible ? currencyFormatter(data.valueInCents / 100) : '****'}
        </span>
      </div>

      <Menu.Root>
        <div className="col-span-1 flex items-center justify-center">
          <Menu.Trigger asChild>
            <button className='focus:outline-none'>
              <FiMoreVertical size={20} />
            </button>
          </Menu.Trigger>

          <Menu.Portal>
            <Menu.Content 
              sideOffset={5}
              align="center"
              className="min-w-[100px] bg-white dark:bg-gray-900 rounded-md p-2 shadow-lg duration-200 will-change-[transform_opacity]" 
            >
              <Menu.Item 
                className='py-1 pl-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none text-sm font-semibold'
                onClick={onEdit}
              >
                Edit
              </Menu.Item>
              <Menu.Item 
                className='py-1 pl-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none text-sm font-semibold'
                onClick={onRemove}
              >
                Remove
              </Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </div>
      </Menu.Root>
    </li>
  )
}

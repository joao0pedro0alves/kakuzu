import clsx from 'clsx'
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs'
import { FiMoreVertical } from 'react-icons/fi'
import { motion } from 'framer-motion'
import * as Menu from '@radix-ui/react-dropdown-menu'

import { currencyFormatter, dateFormatter } from '@/utils/formatter'
import { Transaction as TransactionDto } from '@/@types/dto'
import { useVisibleContext } from '@/contexts/Visible'

interface TransactionProps {
  data: TransactionDto
  transitionDelay?: number
  onToggleActive: () => void
  onRemove: () => void
  onEdit: () => void
}

export function Transaction({
  data,
  transitionDelay = 0.1,
  onToggleActive,
  onRemove,
  onEdit,
}: TransactionProps) {
  const [visible] = useVisibleContext()
  const isExpense = data.type === 'SAIDA'

  return (
    <motion.div
      data-disabled={!data.active}
      role="button"
      transition={{ delay: transitionDelay }}
      initial={{
        transform: 'translateX(-2rem)',
        opacity: 0,
      }}
      animate={{
        transform: 'translateX(0)',
        opacity: 1,
      }}
      className={clsx(
        'grid grid-cols-12 gap-4 items-center p-4 rounded-md shadow-md cursor-pointer transition-all',
        'data-[disabled=true]:shadow-none data-[disabled=true]:bg-gray-200',
        isExpense
          ? 'bg-red-100 dark:bg-gray-700'
          : 'bg-green-100 dark:bg-gray-700'
      )}
    >
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <button
          aria-label='Disable/Enable transaction'
          title="Clique para habilitar/desabilitar a transação"
          onClick={onToggleActive}
          className={clsx(
            'p-2 rounded-full text-white',
            data.active
              ? isExpense
                ? 'bg-red-500 dark:bg-red-500'
                : 'bg-green-500 dark:bg-green-500'
              : 'bg-gray-400 dark:bg-gray-500'
          )}
        >
          {isExpense ? (
            <BsFillArrowDownCircleFill size={20} />
          ) : (
            <BsFillArrowUpCircleFill size={20} />
          )}
        </button>
      </div>

      <div className="col-span-6 md:col-span-7 flex flex-col">
        <span className="text-xs md:text-sm uppercase font-semibold">
          {data.description}
        </span>
        <span className="text-xs text-gray-700 dark:text-gray-300">
          {dateFormatter(data.scheduledAt)}
        </span>
      </div>

      <div className="col-span-3 flex justify-end">
        <span className="font-black text-md md:text-xl">
          {visible ? currencyFormatter(data.valueInCents / 100) : '****'}
        </span>
      </div>

      <Menu.Root>
        <div className="col-span-1 flex items-center justify-center">
          <Menu.Trigger asChild>
            <button aria-label='Open transaction menu' className="focus:outline-none">
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
                className="py-1 pl-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none text-sm font-semibold"
                onClick={onEdit}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                className="py-1 pl-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none text-sm font-semibold"
                onClick={onRemove}
              >
                Remover
              </Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </div>
      </Menu.Root>
    </motion.div>
  )
}

import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AiOutlineClose } from 'react-icons/ai'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format, subDays, addDays } from 'date-fns'

import { Input } from '../utils/Input'
import { Transaction } from '@/@types/dto'

const transactionSchema = z.object({
  description: z.string().max(30, { message: "Description is required"}),
  value: z.coerce.number(),
  scheduledAt: z.coerce.date().min(subDays(new Date(), 1)),
  type: z.union([z.literal('ENTRADA'), z.literal('SAIDA')]),
})

type TransactionSchema = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  onSave: (data: Transaction) => void
  onNew: () => void
  current: Transaction | null
}

const initialValues: TransactionSchema = {
  description: '',
  scheduledAt: format(new Date(), 'yyyy-MM-dd') as any,
  type: 'SAIDA',
  value: 0
}

export function TransactionForm({ onSave, onNew, current }: TransactionFormProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    values: {...initialValues}
  })

  useEffect(() => {

    if (current) {
      setOpen(true)
      setValue('description', current.description)
      setValue('value', current.valueInCents / 100)
      setValue('scheduledAt', format(new Date(current.scheduledAt), 'yyyy-MM-dd') as any)
      setValue('type', current.type)
    } else {
      reset()
    }

  }, [current])

  function onOpenChange() {
    setOpen(!open)
  }

  const onSubmit: SubmitHandler<TransactionSchema> = (data) => {

    const transaction: Transaction = {
      id: current ? current.id : new Date().getTime().toString(),
      createdAt: new Date(),
      description: data.description,
      scheduledAt: addDays(data.scheduledAt, 1),
      type: data.type,
      valueInCents: data.value * 100,
    }

    onSave(transaction)

    setOpen(false)
    reset()
  }

  return (
    <div className="flex justify-end mb-4">
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <button onClick={onNew} className="py-2 px-4 bg-gray-800 rounded-md shadow-md text-white font-bold transition-all hover:bg-gray-700 dark:bg-orange-700 dark:hover:bg-orange-800">
            Nova transação
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/80 fixed inset-0 animate-[overlayShow_150ms_ease-in-out]" />
          <Dialog.Content className="bg-white dark:bg-gray-900 rounded shadow-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh] p-6 animate-[contentShow_150ms_ease-in-out]">
            <Dialog.Title className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap max-w-[90%] overflow-hidden text-ellipsis">
              {current?.description ? `Editar "${current?.description}"` : 'Nova transação'}
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <Input
                autoFocus
                required
                type="text"
                id="description"
                label="Descrição"
                placeholder="Qual a razão da transação?"
                errorMessage={errors.description?.message}
                {...register("description")}
              />
              <Input
                required
                step={0.01}
                type="number"
                id="value"
                label="Valor"
                placeholder="Qual o valor da transação?"
                errorMessage={errors.value?.message}
                {...register("value")}
              />
              <Input
                required
                type="date"
                id="scheduledAt"
                label="Agendado para"
                placeholder="Para quando a transação está agendado?"
                min={format(new Date(), 'yyyy-MM-dd')}
                errorMessage={errors.scheduledAt?.message}
                {...register("scheduledAt")}
              />

              <fieldset className='pl-2'>
                <span className='text-gray-700 text-xs font-semibold dark:text-gray-500'>Tipo</span>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-2'>
                    <input {...register('type')} id="type_receive" type="radio" value="ENTRADA" />
                    <label htmlFor="type_receive">Entrada</label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input {...register('type')} id="type_enter" type="radio" value="SAIDA" />
                    <label htmlFor="type_enter">Saída</label>
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                className="font-bold self-end px-4 py-2 rounded-md text-sm transition-all text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:text-white dark:hover:bg-green-800"
              >
                Salvar alterações
              </button>
            </form>

            <Dialog.Close
              asChild
              className="absolute top-1 right-1 rounded-full w-10 h-10 flex items-center justify-center"
            >
              <button>
                <AiOutlineClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

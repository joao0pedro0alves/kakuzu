import { Transaction } from '@/@types/dto'
import { addDays } from 'date-fns'

export const transactions: Transaction[] = [
  // Last Transactions
  {
    id: '1',
    description: 'Recebimento do vale',
    type: 'ENTRADA',
    valueInCents: 74000,
    createdAt: new Date(),
    scheduledAt: new Date(),
    active: true,
  },
  {
    id: '3',
    description: 'Compra no supermercado',
    type: 'SAIDA',
    valueInCents: 15032,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), -2),
    active: true,
  },
  // Scheduled Transactions
  {
    id: '4',
    description: 'Recebimento do pagamento',
    type: 'ENTRADA',
    valueInCents: 120099,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), 10),
    active: false,
  },
]

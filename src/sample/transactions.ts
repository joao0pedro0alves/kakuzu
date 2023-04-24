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
  },
  {
    id: '2',
    description: 'Pagamento da fatura 04/23',
    type: 'SAIDA',
    valueInCents: 45099,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), -1),
  },
  {
    id: '3',
    description: 'Compra no supermercado',
    type: 'SAIDA',
    valueInCents: 15032,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), -2),
  },
  {
    id: '31',
    description: 'Pagamento da multa',
    type: 'SAIDA',
    valueInCents: 64332,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), -2),
  },
  {
    id: '32',
    description: 'Compra na Renner',
    type: 'SAIDA',
    valueInCents: 650,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), -2),
  },

  // Scheduled Transactions
  {
    id: '4',
    description: 'Recebimento do pagamento',
    type: 'ENTRADA',
    valueInCents: 120099,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), 10),
  },
  {
    id: '5',
    description: 'Pagamento da fatura 05/23',
    type: 'SAIDA',
    valueInCents: 45099,
    createdAt: new Date(),
    scheduledAt: addDays(new Date(), 15),
  },
]

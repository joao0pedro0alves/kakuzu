import { format } from "date-fns"

export const currencyFormatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

export const dateFormatter = (date: Date = new Date()) => format(date, 'dd/MM/yyyy')
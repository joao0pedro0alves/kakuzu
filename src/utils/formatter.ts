import { format } from 'date-fns'

const NumberFormat = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
})

export const currencyFormatter = NumberFormat.format

export const dateFormatter = (date: Date = new Date()) => {
  try {
    return format(date, 'dd/MM/yyyy')
  } catch (error) {
    return format(new Date(date), 'dd/MM/yyyy')
  }
}

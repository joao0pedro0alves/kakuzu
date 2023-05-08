import { isFuture, isToday } from 'date-fns'

export const isScheduled = (date: Date) => !isToday(date) && isFuture(date)

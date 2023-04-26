import { confirmable, createConfirmation } from 'react-confirm'
import { Confirmation, ConfirmationProps } from '@/components/layout/Confirmation'

export function confirm(message: string, options?: ConfirmationProps) { 
  return createConfirmation(confirmable(Confirmation))({
    proceedLabel: options?.proceedLabel ?? "OK",
    cancelLabel: options?.cancelLabel ?? "Cancelar",
    title: options?.title ?? "Tem certeza?",
    description: message
  })
}
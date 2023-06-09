import { confirmable, createConfirmation } from 'react-confirm'
import { Confirmation, ConfirmationProps } from '@/components/layout/Confirmation'

/**
 * 
 * @param message - Confirmation message, print on dialog description, accept HTML tags
 * @param options - Confirmation component options
 */
export function confirm(message: string, options?: ConfirmationProps) { 
  return createConfirmation(confirmable(Confirmation))({
    proceedLabel: options?.proceedLabel ?? "OK",
    cancelLabel: options?.cancelLabel ?? "Cancelar",
    title: options?.title ?? "Confirmação",
    description: message
  })
}
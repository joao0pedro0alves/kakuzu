import * as Dialog from '@radix-ui/react-dialog'

export interface ConfirmationProps {
  proceedLabel: string
  cancelLabel: string
  title: string
  description: string
  show: boolean
  proceed: (confrmed: boolean) => void
}

export function Confirmation({
  title,
  description,
  show,
  proceedLabel,
  cancelLabel,
  proceed,
}: ConfirmationProps) {
  return (
    <Dialog.Root
      defaultOpen
      open={show}
      onOpenChange={() => proceed(false)}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 fixed inset-0 animate-[overlayShow_150ms_ease-in-out]" />
        <Dialog.Content className="bg-white dark:bg-gray-900 rounded shadow-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh] p-6 animate-[contentShow_150ms_ease-in-out]">
          <Dialog.Title
            id="confirmation-dialog-title"
            className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap max-w-[90%] overflow-hidden text-ellipsis"
          >
            {title}
          </Dialog.Title>

          <div 
            id="confirmation-dialog-description"
            className='my-4 text-gray-500 dark:text-gray-300'
          >
            {description}
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="font-bold px-4 py-2 rounded-md text-sm transition-all border border-orange-600 text-orange-600 dark:hover:bg-orange-500/10 focus:outline-1 focus:outline-offset-1 focus:outline-orange-700"
              onClick={() => proceed(false)}
            >
              {cancelLabel}
            </button>
            <button
              autoFocus
              className="font-bold px-4 py-2 rounded-md text-sm transition-all border border-transparent text-white bg-orange-600 dark:hover:bg-orange-800 focus:outline-1 focus:outline-offset-1 focus:outline-orange-700"
              onClick={() => proceed(true)}
            >
              {proceedLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

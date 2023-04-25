import { useVisibleContext } from '@/contexts/Visible'
import { Eye, EyeClosed } from 'phosphor-react'

export function VisibleSwitcher() {
  const [visible, setVisible] = useVisibleContext()

  return (
    <button 
      className="bg-gray-300 dark:bg-gray-800 shadow-md rounded-full w-8 h-8 flex items-center justify-center transition-all hover:shadow-lg"
      onClick={() => setVisible(previousVisible => !previousVisible)}
    >
      {visible ? (
        <Eye size={20} className="text-gray-500 dark:text-gray-300" />
      ) : (
        <EyeClosed size={20} className="text-gray-500 dark:text-gray-300" />
      )}
    </button>
  )
}

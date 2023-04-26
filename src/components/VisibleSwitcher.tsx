import { useVisibleContext } from '@/contexts/Visible'
import { Eye, EyeClosed } from 'phosphor-react'

export function VisibleSwitcher() {
  const [visible, setVisible] = useVisibleContext()

  return (
    <button 
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

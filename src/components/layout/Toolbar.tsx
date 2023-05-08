import { BiMenu } from 'react-icons/bi'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { VisibleSwitcher } from '../VisibleSwitcher'

interface ToolbarProps {
  onOpen: () => void
}

export function Toolbar({ onOpen }: ToolbarProps) {
  return (
    <header className="flex justify-between lg:justify-end items-center px-4 py-4 container mx-auto">

      <button className='hidden max-lg:block' onClick={onOpen}>
        <BiMenu size={24} />
      </button>

      <div className="flex items-center gap-4">
        <VisibleSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}

import { ThemeSwitcher } from '../ThemeSwitcher'
import { VisibleSwitcher } from '../VisibleSwitcher'

export function Toolbar() {
  return (
    <header className="flex justify-end px-4 py-2 container mx-auto">
      <div className="flex items-center gap-4">
        <VisibleSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}

import * as Switch from '@radix-ui/react-switch'
import { useTheme } from '@/hooks/useTheme'
import { HiSun, HiMoon } from 'react-icons/hi'

export function ThemeSwitcher() {
  const [theme, setTheme] = useTheme()

  const isDark = theme === 'dark'

  function toogleTheme() {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Switch.Root
      id="theme-switcher"
      className="w-12 h-6 bg-gray-200 rounded-full relative shadow-sm data-[state=checked]:bg-gray-700"
      onClick={toogleTheme}
      checked={isDark}
       aria-label='Switch theme dark/light'
    >
      <Switch.Thumb
        aria-labelledby='Switch theme dark/light'
        aria-checked={isDark ? "true" : "false"}
        className="w-6 h-6 bg-blue-500 rounded-full shadow-sm duration-200 transition-all translate-x-[2px] will-change-transform flex items-center justify-center
                  data-[state=checked]:translate-x-6 data-[state=checked]:bg-gray-600"
      >
        {isDark ? (
          <HiMoon size={16} />
        ) : (
          <HiSun size={20} className="text-yellow-500" />
        )}
      </Switch.Thumb>
    </Switch.Root>
  )
}

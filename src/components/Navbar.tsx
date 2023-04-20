import { useTheme } from '../hooks/useTheme'

export function Navbar() {
  const [theme, setTheme, isDark] = useTheme()

  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <h4 className="text-2xl font-bold">Resume</h4>

      <button
        className="bg-orange-500 p-2 rounded-lg"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? 'Dark' : 'Light'}
      </button>
    </nav>
  )
}

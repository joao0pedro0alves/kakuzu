import { useEffect } from 'react'
import { usePersistedState } from './usePersistedState'

type Theme = 'light' | 'dark'

function findSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme(): [theme: Theme, setTheme: React.Dispatch<React.SetStateAction<Theme>>] {
  const [theme, setTheme] = usePersistedState<Theme>('theme', findSystemTheme())

  useEffect(() => {
    function chooseTheme() {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    chooseTheme()
  }, [theme])

  return [theme, setTheme]
}

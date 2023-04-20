import { useState, useEffect } from 'react'
import { getItem, setItem } from '../services/storage'

export function usePersistedState<T>(key: string, initialState: T): [T,  React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => getItem(key, initialState))

  useEffect(() => {
    const store = () => {
      setItem(key, JSON.stringify(state))
    }

    store()
  }, [key, state])

  return [state, setState]
}

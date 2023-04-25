import { createContext, useContext, ReactElement } from 'react'
import { usePersistedState } from '@/hooks/usePersistedState'
import { VISIBLE } from '@/constants/storage'

interface VisibleContextProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

interface VisibleProviderProps {
  children: ReactElement
}


export const VisibleContext = createContext<VisibleContextProps>(
  {} as VisibleContextProps
  )

export function useVisibleContext(): [VisibleContextProps['visible'], VisibleContextProps['setVisible']] {
  const { visible, setVisible } = useContext(VisibleContext)
  return [visible, setVisible]
}

export function VisibleProvider({ children }: VisibleProviderProps) {
  const [visible, setVisible] = usePersistedState(VISIBLE, false)

  return (
    <VisibleContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
    </VisibleContext.Provider>
  )
}

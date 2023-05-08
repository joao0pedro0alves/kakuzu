import { useVisibleContext } from '@/contexts/Visible'

interface VisibleTextProps {
  value: string | number
}

export function VisibleText({ value }: VisibleTextProps) {
  const [visible] = useVisibleContext()

  return (
    <>
      {visible ? value : '****'}
    </>
  )
}
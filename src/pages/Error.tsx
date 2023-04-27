import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error: any = useRouteError()

  return (
    <div className='p-4 bg-gray-900 text-gray-100 h-screen w-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-black mb-6'>Oops!</h1>
      <p className='text-lg mb-6 text-gray-300'>Sorry, an unexpected error has occurred.</p>
      <p className='text-lg'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

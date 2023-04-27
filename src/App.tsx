import '@/lib/date-fns'

import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes/app.routes'

export default function App() {
  return <RouterProvider router={appRouter} />
}

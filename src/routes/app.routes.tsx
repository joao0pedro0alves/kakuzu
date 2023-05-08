import { createBrowserRouter } from 'react-router-dom'

import { MainPage } from '@/pages/Main'
import { ErrorPage } from '@/pages/Error'
import { HomePage } from '@/pages/User/Home'
import { TransactionsPage } from '@/pages/User/Transactions'
import { SettingsPage } from '@/pages/User/Settings'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'transactions',
        element: <TransactionsPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
    ]
  },
])
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/layout/Sidebar'
import { Toolbar } from '@/components/layout/Toolbar'

import { VisibleProvider } from '@/contexts/Visible'
import { TransactionsProvider } from '@/contexts/Transactions'

export function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <VisibleProvider>
      <TransactionsProvider>
        <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden">
          <Toolbar 
            onOpen={() => setIsOpen(true)}
          />

          <div className="container relative flex-1 md:max-h-[90%] flex gap-4">
            <Sidebar 
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />

            <section className="flex-1 max-md:shadow-inner md:flex-[4] bg-white p-4 rounded shadow-sm dark:bg-gray-800">
              <Outlet />
            </section>
          </div>
        </main>
      </TransactionsProvider>
    </VisibleProvider>
  )
}

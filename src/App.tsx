import { Sidebar } from './components/layout/Sidebar'
import { Toolbar } from './components/layout/Toolbar'

export default function App() {
  return (
    <main className='w-screen h-screen flex flex-col items-center'>
      <Toolbar />

      <div className="container relative flex-1 max-h-[90%] flex gap-4 mt-4">
        <Sidebar />

        <section 
          className='flex-[4] bg-white p-4 rounded shadow-sm dark:bg-gray-800'
        >
          <h1>
            Home
          </h1>
          {/* ROUTES */}
        </section>
      </div>
    </main>
  )
}

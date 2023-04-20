import { Sidebar } from './components/Sidebar'

export default function App() {
  return (
    <main className="container min-h-[90%] flex gap-4">
      <Sidebar />

      <section 
        className='flex-[4] bg-white p-4 rounded shadow-sm'
      >
        <h1>
          Home
        </h1>
        {/* ROUTES */}
      </section>
    </main>
  )
}

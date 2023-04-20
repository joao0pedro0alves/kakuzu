import { useState } from 'react'
import { Navbar } from './components/Navbar'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  return (
    <main className='container max-w-lg mx-auto mt-4'>
      <Navbar 
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </main>
  )
}

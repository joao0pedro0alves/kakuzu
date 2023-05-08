import { NavLink } from 'react-router-dom'

import { GoDashboard } from 'react-icons/go'
import { BiTransfer } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

import { Avatar } from '../utils/Avatar'

const NAVIGATION_LINKS = [
  { label: 'Dashboard', to: 'home', Icon: GoDashboard },
  { label: 'Transactions', to: 'transactions', Icon: BiTransfer },
  { label: 'Settings', to: 'settings', Icon: IoMdSettings },
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col flex-1 bg-gray-800 text-white rounded-lg overflow-hidden shadow-sm">
      <section className="p-4 border-b border-gray-700 flex items-center gap-4">
        <Avatar />

        <div className="flex flex-col">
          <span className="text-orange-500 font-bold">Kakuzu</span>
          <span className="text-gray-400 text-sm">kakuzu@akatsuki.com</span>
        </div>
      </section>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2 px-4 my-4">
          {NAVIGATION_LINKS.map(({ label, to, Icon }) => (
            <li
              className="w-full rounded nav-link hover:bg-gray-900 transition-colors"
              key={`navigation-link-${to}`}
            >
              <NavLink to={to} className="p-4 flex items-center gap-4">
                <Icon fontSize={22} className="text-orange-500" />
                <span className="text-sm text-orange-500 font-bold">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="border-t border-t-gray-700 p-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-gray-400">Developed by João Alves</span>

        <div className='flex gap-2'>
          <a 
            className='block p-2 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors'
            href="https://github.com/joao0pedro0alves" 
            target="_blank"
            aria-label='View github author profile'
          >
            <AiFillGithub size={16} />
          </a>
          <a 
            className='block p-2 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors'
            href="https://www.linkedin.com/in/jo%C3%A3o-pedro-alves-pereira-bb0052216/" 
            target="_blank"
            aria-label='View linkedin author profile'
          >
            <AiFillLinkedin size={16} />
          </a>
        </div>
      </footer>
    </aside>
  )
}

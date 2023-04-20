import { Avatar } from './common/Avatar'

import { GoDashboard } from 'react-icons/go'
import { BiTransfer } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'

export function Sidebar() {
  return (
    <aside className="flex flex-col flex-1 bg-gray-800 text-white rounded shadow-sm">
      <section className="p-4 border-b border-gray-700 flex items-center gap-4">
        <Avatar />

        <div className="flex flex-col">
          <span className="text-orange-500 font-bold">João</span>
          <span className="text-gray-400 text-sm">joao.alves@gmail.com</span>
        </div>
      </section>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2 px-4 my-4">
          <li
            className="w-full rounded data-[active=true]:bg-gray-700 hover:bg-gray-700"
            data-active="true"
          >
            <a href="#" className="p-4 flex items-center gap-4">
              <GoDashboard fontSize={22} className="text-orange-500" />
              <span className="text-orange-500 font-bold">Dashboard</span>
            </a>
          </li>

          <li className="w-full rounded hover:bg-gray-700">
            <a href="#" className="p-4 flex items-center gap-4">
              <BiTransfer fontSize={22} className="text-orange-500" />
              <span className="text-orange-500 font-bold">Transactions</span>
            </a>
          </li>

          <li className="w-full rounded hover:bg-gray-700">
            <a href="#" className="p-4 flex items-center gap-4">
              <IoMdSettings fontSize={22} className="text-orange-500" />
              <span className="text-orange-500 font-bold">Setttings</span>
            </a>
          </li>
        </ul>
      </nav>

      <footer className="border border-t-gray-700 p-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-gray-400">Developed by João Alves</span>

        <div className='flex gap-2'>
          <a 
            className='block p-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors'
            href="https://github.com/joao0pedro0alves" 
            target="_blank"
          >
            <AiFillGithub size={16} />
          </a>

          <a 
            className='block p-2 border border-gray-600 rounded-md hover:bg-violet-700 transition-colors'
            href="https://github.com/joao0pedro0alves" 
            target="_blank"
          >
            <AiFillInstagram size={16} />
          </a>

          <a 
            className='block p-2 border border-gray-600 rounded-md hover:bg-blue-700 transition-colors'
            href="https://github.com/joao0pedro0alves" 
            target="_blank"
          >
            <AiFillLinkedin size={16} />
          </a>
        </div>
      </footer>
    </aside>
  )
}

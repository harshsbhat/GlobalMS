'use client'

import * as React from 'react'
import { MonitorCheck, Logs, Menu, X, ChartArea, BookOpen } from 'lucide-react'
import { useUserData } from "@/hooks/useUserdata";

const navItems = [
  { icon: MonitorCheck, label: 'Applications', href: '/dashboard/applications' },
  { icon: ChartArea, label: 'Status', href: '/dashboard/status' },
  { icon: Logs, label: 'Audit Logs', href: '/dashboard/logs' },
  { icon: BookOpen, label: 'Docs', href: '/docs' },
]

export function AppSidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { email } = useUserData();
  
  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 p-2 bg-gray-200 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <aside className={`
        bg-gray-100 w-64 h-screen fixed left-0 top-0 p-4 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col
      `}>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-md p-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex items-center space-x-2 text-gray-700 p-2  hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors hover:cursor-pointer">
          <span className="text-sm">{email}</span>
        </div>
      </aside>
    </>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/cn'

const navigation = [
  { name: 'Overview', href: '/overview', icon: '📊' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-border-secondary flex flex-col">
        <div className="p-6 border-b border-border-secondary">
          <Link href="/" className="text-xl font-bold text-fg-primary">
            SaaS Template
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-bg-brand-primary text-fg-brand-primary'
                      : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg-primary'
                  )}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border-secondary">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-medium">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg-primary truncate">User Name</p>
              <p className="text-xs text-fg-tertiary truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-bg-primary">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

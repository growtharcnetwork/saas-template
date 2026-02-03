'use client'

import Link from 'next/link'
import { Button } from '../components/base/buttons/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border-secondary bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-fg-primary">SaaS Template</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/login">
                <Button color="tertiary" size="md">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button color="primary" size="md">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg-primary mb-6">
            Build your SaaS
            <span className="text-brand-600"> faster</span>
          </h1>
          <p className="text-lg sm:text-xl text-fg-secondary mb-8 max-w-2xl mx-auto">
            A production-ready template with authentication, billing, and everything 
            you need to launch your next product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button color="primary" size="lg">Start Building — Free</Button>
            </Link>
            <Link href="/login">
              <Button color="secondary" size="lg">View Demo</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-fg-tertiary">
          <p>© 2026 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

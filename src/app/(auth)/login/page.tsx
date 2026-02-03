'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { Label } from '@/components/base/input/label'
import { Checkbox } from '@/components/base/checkbox/checkbox'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement auth with Supabase
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="bg-bg-primary rounded-xl shadow-lg p-8 border border-border-secondary">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Welcome back</h1>
        <p className="text-fg-tertiary">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            isSelected={remember}
            onChange={(isSelected) => setRemember(isSelected)}
          >
            Remember me
          </Checkbox>
          <Link 
            href="/forgot-password" 
            className="text-sm text-brand-600 hover:text-brand-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          color="primary" 
          size="md" 
          isLoading={isLoading}
          className="w-full"
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-fg-tertiary">
          Don't have an account?{' '}
          <Link href="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

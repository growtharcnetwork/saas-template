'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { Label } from '@/components/base/input/label'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { signIn, signInWithMagicLink } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [useMagicLink, setUseMagicLink] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (useMagicLink) {
      const result = await signInWithMagicLink(email)
      if (result.error) {
        setError(result.error.message)
      } else {
        setMagicLinkSent(true)
      }
    } else {
      const result = await signIn(email, password)
      if (result.error) {
        setError(result.error.message)
      } else {
        router.push('/overview')
      }
    }

    setIsLoading(false)
  }

  if (magicLinkSent) {
    return (
      <div className="bg-bg-primary rounded-xl shadow-lg p-8 border border-border-secondary text-center">
        <div className="text-4xl mb-4">✉️</div>
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Check your email</h1>
        <p className="text-fg-tertiary mb-6">
          We sent a login link to <strong>{email}</strong>
        </p>
        <Button 
          color="tertiary" 
          onClick={() => setMagicLinkSent(false)}
        >
          Use a different email
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-bg-primary rounded-xl shadow-lg p-8 border border-border-secondary">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Welcome back</h1>
        <p className="text-fg-tertiary">Sign in to your account to continue</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-bg-error-primary text-fg-error-primary text-sm">
          {error}
        </div>
      )}

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

        {!useMagicLink && (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!useMagicLink}
            />
          </div>
        )}

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
          {useMagicLink ? 'Send magic link' : 'Sign in'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setUseMagicLink(!useMagicLink)}
            className="text-sm text-fg-tertiary hover:text-fg-secondary"
          >
            {useMagicLink ? 'Use password instead' : 'Sign in with magic link'}
          </button>
        </div>
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

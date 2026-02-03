'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../../../components/base/buttons/button'
import { Input } from '../../../components/base/input/input'
import { Label } from '../../../components/base/input/label'
import { resetPassword } from '../../../lib/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const result = await resetPassword(email)
    
    if (result.error) {
      setError(result.error.message)
    } else {
      setSuccess(true)
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="bg-bg-primary rounded-xl shadow-lg p-8 border border-border-secondary text-center">
        <div className="text-4xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Check your email</h1>
        <p className="text-fg-tertiary mb-6">
          We sent a password reset link to <strong>{email}</strong>
        </p>
        <Link href="/login">
          <Button color="tertiary">Back to sign in</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-bg-primary rounded-xl shadow-lg p-8 border border-border-secondary">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Forgot your password?</h1>
        <p className="text-fg-tertiary">No worries, we'll send you reset instructions.</p>
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

        <Button 
          type="submit" 
          color="primary" 
          size="md" 
          isLoading={isLoading}
          className="w-full"
        >
          Send reset link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-fg-tertiary hover:text-fg-secondary text-sm">
          ← Back to sign in
        </Link>
      </div>
    </div>
  )
}

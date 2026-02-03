'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/base/buttons/button'
import { Input } from '../../../components/base/input/input'
import { Label } from '../../../components/base/input/label'
import { Checkbox } from '../../../components/base/checkbox/checkbox'
import { signUp } from '../../../lib/auth'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    setIsLoading(true)

    const result = await signUp(email, password)
    
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
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Check your email</h1>
        <p className="text-fg-tertiary mb-6">
          We sent a confirmation link to <strong>{email}</strong>
        </p>
        <p className="text-fg-tertiary text-sm">
          Click the link in your email to activate your account.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-bg-primary rounded-xl shadow-lg p-8 border border-border-secondary">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Create your account</h1>
        <p className="text-fg-tertiary">Start your free trial today</p>
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

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <Checkbox
            isSelected={acceptTerms}
            onChange={(isSelected) => setAcceptTerms(isSelected)}
          >
            <span className="text-fg-tertiary">
              I agree to the{' '}
              <Link href="/terms" className="text-brand-600 hover:text-brand-700">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-brand-600 hover:text-brand-700">
                Privacy Policy
              </Link>
            </span>
          </Checkbox>
        </div>

        <Button 
          type="submit" 
          color="primary" 
          size="md" 
          isLoading={isLoading}
          className="w-full"
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-fg-tertiary">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

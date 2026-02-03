'use client'

import { useState } from 'react'
import { Button } from '../../../components/base/buttons/button'
import { Input } from '../../../components/base/input/input'
import { Label } from '../../../components/base/input/label'

export default function SettingsPage() {
  const [name, setName] = useState('User Name')
  const [email, setEmail] = useState('user@example.com')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement settings update
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-fg-primary">Settings</h1>
        <p className="text-fg-tertiary mt-1">Manage your account settings</p>
      </div>

      <div className="max-w-2xl">
        {/* Profile Section */}
        <section className="bg-bg-primary border border-border-secondary rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-fg-primary mb-4">Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="settings-email">Email</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                color="primary" 
                size="md"
                isLoading={isLoading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </section>

        {/* Danger Zone */}
        <section className="bg-bg-primary border border-border-error rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-fg-error-primary mb-2">Danger Zone</h2>
          <p className="text-fg-tertiary mb-4">
            Once you delete your account, there is no going back.
          </p>
          <Button color="destructive" size="md">
            Delete Account
          </Button>
        </section>
      </div>
    </div>
  )
}

import { getSupabaseClient, isSupabaseConfigured } from './supabase'

export type AuthError = {
  message: string
  status?: number
}

export type AuthResult<T> = {
  data: T | null
  error: AuthError | null
}

function checkSupabase(): AuthResult<never> | null {
  if (!isSupabaseConfigured()) {
    return { data: null, error: { message: 'Supabase is not configured', status: 503 } }
  }
  return null
}

// Sign up with email and password
export async function signUp(email: string, password: string): Promise<AuthResult<{ user: any }>> {
  const check = checkSupabase()
  if (check) return check
  
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      return { data: null, error: { message: error.message, status: 400 } }
    }
    
    return { data: { user: data.user }, error: null }
  } catch (err) {
    return { data: null, error: { message: 'An unexpected error occurred', status: 500 } }
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<AuthResult<{ user: any; session: any }>> {
  const check = checkSupabase()
  if (check) return check
  
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      return { data: null, error: { message: error.message, status: 401 } }
    }
    
    return { data: { user: data.user, session: data.session }, error: null }
  } catch (err) {
    return { data: null, error: { message: 'An unexpected error occurred', status: 500 } }
  }
}

// Sign in with magic link (passwordless)
export async function signInWithMagicLink(email: string): Promise<AuthResult<{ message: string }>> {
  const check = checkSupabase()
  if (check) return check
  
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || ''}/auth/callback`,
      },
    })
    
    if (error) {
      return { data: null, error: { message: error.message, status: 400 } }
    }
    
    return { data: { message: 'Check your email for the login link!' }, error: null }
  } catch (err) {
    return { data: null, error: { message: 'An unexpected error occurred', status: 500 } }
  }
}

// Sign out
export async function signOut(): Promise<AuthResult<{ message: string }>> {
  const check = checkSupabase()
  if (check) return check
  
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { data: null, error: { message: error.message, status: 400 } }
    }
    
    return { data: { message: 'Signed out successfully' }, error: null }
  } catch (err) {
    return { data: null, error: { message: 'An unexpected error occurred', status: 500 } }
  }
}

// Get current session
export async function getSession() {
  if (!isSupabaseConfigured()) return { session: null, error: null }
  const supabase = getSupabaseClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

// Get current user
export async function getUser() {
  if (!isSupabaseConfigured()) return { user: null, error: null }
  const supabase = getSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Password reset request
export async function resetPassword(email: string): Promise<AuthResult<{ message: string }>> {
  const check = checkSupabase()
  if (check) return check
  
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || ''}/auth/reset-password`,
    })
    
    if (error) {
      return { data: null, error: { message: error.message, status: 400 } }
    }
    
    return { data: { message: 'Check your email for the password reset link!' }, error: null }
  } catch (err) {
    return { data: null, error: { message: 'An unexpected error occurred', status: 500 } }
  }
}

// Update password
export async function updatePassword(newPassword: string): Promise<AuthResult<{ message: string }>> {
  const check = checkSupabase()
  if (check) return check
  
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    
    if (error) {
      return { data: null, error: { message: error.message, status: 400 } }
    }
    
    return { data: { message: 'Password updated successfully' }, error: null }
  } catch (err) {
    return { data: null, error: { message: 'An unexpected error occurred', status: 500 } }
  }
}

// Listen for auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  if (!isSupabaseConfigured()) return { data: { subscription: { unsubscribe: () => {} } } }
  const supabase = getSupabaseClient()
  return supabase.auth.onAuthStateChange(callback)
}

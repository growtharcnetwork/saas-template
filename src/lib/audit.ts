// Audit Logging System

import { supabase } from './supabase'

export type AuditAction = 
  | 'user.login'
  | 'user.logout'
  | 'user.signup'
  | 'user.password_reset'
  | 'user.profile_update'
  | 'user.delete'
  | 'team.create'
  | 'team.update'
  | 'team.delete'
  | 'team.member_add'
  | 'team.member_remove'
  | 'team.member_role_change'
  | 'billing.subscription_create'
  | 'billing.subscription_update'
  | 'billing.subscription_cancel'
  | 'billing.payment_success'
  | 'billing.payment_failed'
  | 'settings.update'
  | 'api.key_create'
  | 'api.key_revoke'
  | 'data.export'
  | 'data.import'
  | 'admin.impersonate_start'
  | 'admin.impersonate_end'

export type AuditLogEntry = {
  id: string
  timestamp: Date
  userId: string
  action: AuditAction
  resourceType?: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

export type AuditLogInput = Omit<AuditLogEntry, 'id' | 'timestamp'>

// Log an audit event
export async function logAuditEvent(entry: AuditLogInput): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: entry.userId,
        action: entry.action,
        resource_type: entry.resourceType,
        resource_id: entry.resourceId,
        metadata: entry.metadata,
        ip_address: entry.ipAddress,
        user_agent: entry.userAgent,
        created_at: new Date().toISOString(),
      })
    
    if (error) {
      console.error('Failed to log audit event:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, error: null }
  } catch (err) {
    console.error('Audit logging error:', err)
    return { success: false, error: 'Failed to log audit event' }
  }
}

// Get audit logs for a user
export async function getUserAuditLogs(
  userId: string, 
  options?: { limit?: number; offset?: number; action?: AuditAction }
): Promise<{ logs: AuditLogEntry[]; error: string | null }> {
  try {
    let query = supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (options?.action) {
      query = query.eq('action', options.action)
    }
    
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1)
    }
    
    const { data, error } = await query
    
    if (error) {
      return { logs: [], error: error.message }
    }
    
    return { 
      logs: data?.map(row => ({
        id: row.id,
        timestamp: new Date(row.created_at),
        userId: row.user_id,
        action: row.action as AuditAction,
        resourceType: row.resource_type,
        resourceId: row.resource_id,
        metadata: row.metadata,
        ipAddress: row.ip_address,
        userAgent: row.user_agent,
      })) || [], 
      error: null 
    }
  } catch (err) {
    return { logs: [], error: 'Failed to fetch audit logs' }
  }
}

// Get audit logs for a resource
export async function getResourceAuditLogs(
  resourceType: string,
  resourceId: string,
  options?: { limit?: number }
): Promise<{ logs: AuditLogEntry[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .order('created_at', { ascending: false })
      .limit(options?.limit || 100)
    
    if (error) {
      return { logs: [], error: error.message }
    }
    
    return { 
      logs: data?.map(row => ({
        id: row.id,
        timestamp: new Date(row.created_at),
        userId: row.user_id,
        action: row.action as AuditAction,
        resourceType: row.resource_type,
        resourceId: row.resource_id,
        metadata: row.metadata,
        ipAddress: row.ip_address,
        userAgent: row.user_agent,
      })) || [], 
      error: null 
    }
  } catch (err) {
    return { logs: [], error: 'Failed to fetch audit logs' }
  }
}

// Human-readable action descriptions
export const actionDescriptions: Record<AuditAction, string> = {
  'user.login': 'User logged in',
  'user.logout': 'User logged out',
  'user.signup': 'User signed up',
  'user.password_reset': 'Password was reset',
  'user.profile_update': 'Profile was updated',
  'user.delete': 'User account deleted',
  'team.create': 'Team was created',
  'team.update': 'Team was updated',
  'team.delete': 'Team was deleted',
  'team.member_add': 'Member was added to team',
  'team.member_remove': 'Member was removed from team',
  'team.member_role_change': 'Member role was changed',
  'billing.subscription_create': 'Subscription was created',
  'billing.subscription_update': 'Subscription was updated',
  'billing.subscription_cancel': 'Subscription was canceled',
  'billing.payment_success': 'Payment succeeded',
  'billing.payment_failed': 'Payment failed',
  'settings.update': 'Settings were updated',
  'api.key_create': 'API key was created',
  'api.key_revoke': 'API key was revoked',
  'data.export': 'Data was exported',
  'data.import': 'Data was imported',
  'admin.impersonate_start': 'Admin started impersonating user',
  'admin.impersonate_end': 'Admin stopped impersonating user',
}

// Role-Based Access Control (RBAC)

export type Role = 'owner' | 'admin' | 'member' | 'viewer'

export type Permission = 
  | 'read:dashboard'
  | 'write:dashboard'
  | 'read:settings'
  | 'write:settings'
  | 'read:billing'
  | 'write:billing'
  | 'read:users'
  | 'write:users'
  | 'delete:users'
  | 'read:audit'
  | 'admin:all'

// Role hierarchy and permissions
const rolePermissions: Record<Role, Permission[]> = {
  owner: [
    'admin:all',
    'read:dashboard', 'write:dashboard',
    'read:settings', 'write:settings',
    'read:billing', 'write:billing',
    'read:users', 'write:users', 'delete:users',
    'read:audit',
  ],
  admin: [
    'read:dashboard', 'write:dashboard',
    'read:settings', 'write:settings',
    'read:billing',
    'read:users', 'write:users',
    'read:audit',
  ],
  member: [
    'read:dashboard', 'write:dashboard',
    'read:settings',
  ],
  viewer: [
    'read:dashboard',
  ],
}

// Check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = rolePermissions[role]
  return permissions.includes('admin:all') || permissions.includes(permission)
}

// Check if a role can access a specific resource
export function canAccess(role: Role, resource: string, action: 'read' | 'write' | 'delete'): boolean {
  const permission = `${action}:${resource}` as Permission
  return hasPermission(role, permission)
}

// Get all permissions for a role
export function getPermissions(role: Role): Permission[] {
  return rolePermissions[role]
}

// Check if one role is higher than another
export function isHigherRole(role1: Role, role2: Role): boolean {
  const hierarchy: Role[] = ['viewer', 'member', 'admin', 'owner']
  return hierarchy.indexOf(role1) > hierarchy.indexOf(role2)
}

// Role display names
export const roleLabels: Record<Role, string> = {
  owner: 'Owner',
  admin: 'Administrator',
  member: 'Member',
  viewer: 'Viewer',
}

// Role descriptions
export const roleDescriptions: Record<Role, string> = {
  owner: 'Full access to all features including billing and user management',
  admin: 'Can manage users and settings, view billing',
  member: 'Can view and edit dashboard content',
  viewer: 'Read-only access to dashboard',
}

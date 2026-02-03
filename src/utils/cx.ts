// Simple class name utility
export function cx(...classes: (string | boolean | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

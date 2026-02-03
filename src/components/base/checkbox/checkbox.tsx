'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CheckboxProps {
  children?: ReactNode
  isSelected?: boolean
  onChange?: (isSelected: boolean) => void
  className?: string
  disabled?: boolean
}

export function Checkbox({ 
  children, 
  isSelected, 
  onChange, 
  className,
  disabled 
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border transition-colors',
          isSelected
            ? 'bg-brand-600 border-brand-600'
            : 'bg-white border-gray-300 hover:border-brand-500'
        )}
      >
        {isSelected && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {children && (
        <span className="text-sm text-gray-700">{children}</span>
      )}
    </label>
  )
}

export default Checkbox

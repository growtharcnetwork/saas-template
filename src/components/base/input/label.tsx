'use client'

import { LabelHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-gray-700 mb-1.5',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label

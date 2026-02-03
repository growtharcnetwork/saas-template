'use client'

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  color?: ButtonVariant // alias for variant
  size?: ButtonSize
  isLoading?: boolean
  isDisabled?: boolean
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | LinkProps

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500 disabled:bg-gray-300',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  tertiary: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ className, variant, color, size = 'md', isLoading, isDisabled, children, ...props }, ref) => {
    const actualVariant = variant || color || 'primary'
    const disabled = isDisabled || isLoading

    const classes = cn(
      'inline-flex items-center justify-center font-semibold rounded-lg transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      variantStyles[actualVariant],
      sizeStyles[size],
      className
    )

    if ('href' in props && props.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {isLoading && <LoadingSpinner />}
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default Button

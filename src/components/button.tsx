'use client'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import Loading from './loading'

const button = tv({
  base: 'rounded-md px-6 py-3 text-white transition-colors',
  variants: {
    fill: {
      empty: 'bg-transparent border-2 border-grey-400 hover:bg-grey-700',
      base: 'bg-sky-700 hover:bg-sky-800',
    },
  },
  defaultVariants: {
    fill: 'base',
  },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    text: string
    href?: string
    loading?: boolean
    children?: ReactNode
  }

const Button = ({
  text,
  className,
  fill,
  href,
  loading,
  children,
  ...props
}: ButtonProps) => {
  if (children) {
    return (
      <button {...props} className={button({ fill, className })}>
        <span>{text}</span>
        {children}
      </button>
    )
  }

  if (loading) {
    return (
      <button
        disabled
        {...props}
        className={button({
          fill,
          className: `${className} flex cursor-not-allowed items-center justify-center`,
        })}
      >
        <Loading className="h-8 w-8" />
      </button>
    )
  }

  if (href) {
    return (
      <Link
        className={button({
          fill,
          className: `${className} flex items-center justify-center`,
        })}
        href={href}
      >
        <button {...props}>{text}</button>
      </Link>
    )
  }

  return (
    <button {...props} className={button({ fill, className })}>
      {text}
    </button>
  )
}

export default Button

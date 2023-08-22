'use client'
import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-md px-6 py-2 text-white transition-colors',
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
  }

const Button = ({
  text,
  className,
  fill,
  href,
  loading,
  ...props
}: ButtonProps) => {
  if (!loading) {
    return <p>oi</p>
  }

  if (href) {
    return (
      <>
        <Link
          className={button({
            fill,
            className: `${className} flex items-center justify-center`,
          })}
          href={href}
        >
          <button {...props}>{text}</button>
        </Link>
      </>
    )
  }

  return (
    <button {...props} className={button({ fill, className })}>
      {text}
    </button>
  )
}

export default Button

'use client'
import { ButtonHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-md px-6 py-2 text-white transition-colors',
  variants: {
    fill: {
      empty: 'bg-transparent ring-2 ring-grey-400 hover:bg-grey-600',
      default: 'bg-sky-700 hover:bg-sky-800',
    },
  },
  defaultVariants: {
    fill: 'default',
  },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    text: string
  }

const Button = ({ text, className, fill, ...props }: ButtonProps) => {
  return (
    <button {...props} className={button({ fill, className })}>
      {text}
    </button>
  )
}

export default Button

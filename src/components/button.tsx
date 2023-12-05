'use client'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import Loading from '@/components/Layout/loading'
import { ChevronRight } from 'lucide-react'

const button = tv({
  base: 'rounded-md px-4 py-3 text-white transition-colors h-12',
  variants: {
    fill: {
      empty: 'bg-button-gradient border border-grey-400',
      base: 'bg-sky-gradient',
      alert: 'bg-red-500',
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
    isModalButton?: boolean
    target?: '_blank'
  }

const Button = ({
  text,
  className,
  fill,
  href,
  loading,
  children,
  isModalButton,
  target,
  ...props
}: ButtonProps) => {
  if (isModalButton && href) {
    return (
      <button {...props}>
        <Link
          className={button({
            fill,
            className: `flex w-full items-center justify-between px-4 py-3`,
          })}
          target={target}
          href={href}
        >
          <div className="flex items-center gap-x-3">
            {children}
            <div className="h-[24px] w-[2px] bg-grey-400" />
            <span>{text}</span>
          </div>
          <ChevronRight color="#fff" />
        </Link>
      </button>
    )
  }

  if (isModalButton) {
    return (
      <button
        className={button({
          fill,
          className: `flex w-full items-center justify-between px-4 py-3`,
        })}
        {...props}
      >
        <div className="flex items-center gap-x-3">
          {children}
          <div className="h-[24px] w-[2px] bg-grey-400" />
          <span>{text}</span>
        </div>
        <ChevronRight color="#fff" />
      </button>
    )
  }

  if (children && href) {
    return (
      <button className={className}>
        <Link
          target={target}
          className={button({
            fill,
            className: `flex w-full items-center justify-between`,
          })}
          href={href}
        >
          <span>{text}</span>
          {children}
        </Link>
      </button>
    )
  }

  if (children) {
    return (
      <button
        {...props}
        className={button({
          fill,
          className: `${className} flex items-center justify-between`,
        })}
      >
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
        target={target}
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

'use client'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { ChevronRight } from 'lucide-react'
import Loading from '@/utils/utils'

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
    isDeskCard?: boolean
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
  isDeskCard,
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
    if (children) {
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
    } else {
      return (
        <button
          className={button({
            fill,
            className: `flex w-full items-center justify-between px-4 py-3`,
          })}
          {...props}
        >
          <div className="flex items-center gap-x-3">
            <span>{text}</span>
          </div>
          <ChevronRight color="#fff" />
        </button>
      )
    }
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

  if (isDeskCard && href) {
    return (
      <button className={className}>
        <Link
          target={target}
          className={button({
            fill,
            className: `flex w-full items-center justify-center`,
          })}
          href={href}
        >
          {text}
        </Link>
      </button>
    )
  }

  if (href) {
    return (
      <button {...props}>
        <Link
          className={button({
            fill,
            className: `${className} flex items-center justify-center`,
          })}
          target={target}
          href={href}
        >
          {text}
        </Link>
      </button>
    )
  }

  return (
    <button {...props} className={button({ fill, className })}>
      {text}
    </button>
  )
}

export default Button

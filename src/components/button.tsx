'use client'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  const { push } = useRouter()

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
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-white text-gray-200 dark:text-white/40"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </button>
    )
  }

  if (isDeskCard && href) {
    return (
      <button
        className={button({
          fill,
          className: `${className} flex items-center justify-center`,
        })}
        {...props}
        onClick={() => push(href)}
      >
        {text}
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

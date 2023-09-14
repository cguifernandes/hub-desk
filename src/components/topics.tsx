/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExternalLink } from 'lucide-react'
import { tv, VariantProps } from 'tailwind-variants'
import { ButtonHTMLAttributes } from 'react'
import Text from './Typography/text'
import Link from 'next/link'

const topics = tv({
  base: 'rounded-md bg-sky-700 transition-colors hover:bg-sky-800',
  variants: {
    component: {
      button: 'w-full',
      topics: 'relative flex h-[220px] items-center justify-center',
    },
  },
  defaultVariants: {
    component: 'topics',
  },
})

type TopicsProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof topics> & {
    text: string
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xlg' | 'base'
    href?: string
  }

const Topics = ({
  className,
  text,
  component,
  size = 'base',
  href,
  onClick,
}: TopicsProps) => {
  return (
    <Link
      className={topics({ component, className: `${className} shadow-md` })}
      href={href!}
    >
      <button
        style={
          component === 'button'
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'center' }
        }
        onClick={onClick}
        className="flex h-full w-full items-center px-6 py-3"
      >
        <Text size={size} className="font-montserrat text-white">
          {text}
        </Text>
        {component === 'button' ? (
          <ExternalLink strokeWidth={1.5} color="#fff" />
        ) : (
          <span className="absolute bottom-6 right-6 flex items-center text-sm text-white">
            Ver mais{' '}
            <ExternalLink strokeWidth={1.5} size={20} className="ml-2" />
          </span>
        )}
      </button>
    </Link>
  )
}

export default Topics

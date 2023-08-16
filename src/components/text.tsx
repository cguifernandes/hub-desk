import clsx from 'clsx'
import { ReactNode } from 'react'

type TextProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xlg'
  className?: string
  align?: 'left' | 'center' | 'right'
}

const Text = ({
  children,
  size = 'md',
  className,
  align = 'left',
  ...props
}: TextProps) => {
  return (
    <h1
      className={clsx(
        'text-white',
        {
          'text-xl': size === 'sm',
          'text-xxl': size === 'md',
          'text-2xl': size === 'lg',
          'text-3xl': size === 'xlg',
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export default Text

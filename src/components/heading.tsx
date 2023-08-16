import clsx from 'clsx'
import { ReactNode } from 'react'

type HeadingProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xlg'
  className?: string
  align?: 'left' | 'center' | 'right'
}

const Heading = ({
  children,
  size = 'md',
  className,
  align = 'left',
  ...props
}: HeadingProps) => {
  return (
    <h1
      className={clsx(
        'font-montserrat text-white',
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

export default Heading

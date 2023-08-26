import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const heading = tv({
  base: 'text-white',
  variants: {
    size: {
      base: 'text-base',
      sm: 'text-sm',
      md: 'text-xl',
      lg: 'text-2xl',
      xlg: 'text-3xl',
    },
    align: {
      center: 'text-center',
      right: 'text-right',
      left: 'text-left',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type HeadingProps = VariantProps<typeof heading> & {
  children: ReactNode
  className?: string
}

const Heading = ({
  children,
  size,
  className,
  align,
  ...props
}: HeadingProps) => {
  return (
    <h1 className={heading({ size, className, align })} {...props}>
      {children}
    </h1>
  )
}

export default Heading

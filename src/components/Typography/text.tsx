import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const text = tv({
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

type TextProps = VariantProps<typeof text> & {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xlg' | 'base'
  className?: string
  align?: 'left' | 'center' | 'right'
}

const Text = ({ children, size, className, align, ...props }: TextProps) => {
  return (
    <p className={text({ size, className, align })} {...props}>
      {children}
    </p>
  )
}

export default Text

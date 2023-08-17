import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const text = tv({
  base: 'text-white',
  variants: {
    size: {
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
    size: 'sm',
    align: 'left',
  },
})

type TextProps = VariantProps<typeof text> & {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xlg'
  className?: string
  align?: 'left' | 'center' | 'right'
}

// AJUSTAR PARA NOVA FORMA DE TIPAR
const Text = ({ children, size, className, align, ...props }: TextProps) => {
  return (
    <p className={text({ size, className, align })} {...props}>
      {children}
    </p>
  )
}

export default Text

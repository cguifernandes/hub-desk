import { ButtonHTMLAttributes } from 'react'
import Button from '../button'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded-md px-6 py-2 text-white transition-colors',
  variants: {
    fill: {
      empty: 'bg-transparent border-2 border-grey-400 hover:bg-grey-700',
      base: 'bg-sky-700 hover:bg-sky-800',
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
  }

const FormButton = ({ text, className, fill, ...props }: ButtonProps) => {
  return <Button text={text} {...props} className={className} fill={fill} />
}

export default FormButton

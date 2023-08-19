import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

const FormInput = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        'w-full rounded-md bg-grey-400/30 p-4 text-white placeholder-white/50',
        className,
      )}
      {...props}
    />
  )
}

export default FormInput

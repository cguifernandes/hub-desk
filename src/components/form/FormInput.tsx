import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
}

const FormInput = ({ className, children, ...props }: InputProps) => {
  if (children) {
    return (
      <div className="relative flex justify-between">
        <input
          className={clsx(
            'w-[calc(100%_-_60px)] rounded-l-md border-2 border-transparent bg-grey-400/30 p-4 py-3',
            'text-white placeholder-white/50 transition-colors focus:border-sky-700',
            className,
          )}
          {...props}
        />
        {children}
      </div>
    )
  }

  return (
    <input
      className={clsx(
        'w-full rounded-l-md border-2 border-transparent bg-grey-400/30 p-4 text-white',
        'placeholder-white/50 transition-colors focus:border-sky-700',
        className,
      )}
      {...props}
    />
  )
}

export default FormInput

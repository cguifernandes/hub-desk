/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children: ReactNode
  register?: UseFormRegister<{ email: string; password: string; title: string }>
  name?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const Input = ({
  children,
  className,
  error,
  name,
  register,
  ...props
}: InputProps) => {
  if (register) {
    return (
      <div className="relative flex items-center justify-between shadow-md">
        <input
          {...register(name as 'title' | 'email' | 'password')}
          className={clsx(
            'w-full rounded-md border-2 border-transparent bg-button-gradient text-white',
            'px-4 py-3 placeholder-white/50 transition-colors focus:border-sky-700',
            className,
          )}
          {...props}
          style={error && { borderColor: 'rgb(239 68 68)' }}
        />
        {children}
      </div>
    )
  }

  return (
    <div className={clsx('relative flex justify-between shadow-md', className)}>
      <input
        className={clsx(
          'w-[calc(100%_-_60px)] rounded-l-md border-y-2 border-l-2 border-transparent bg-grey-550',
          'p-4 text-white placeholder-white/50 transition-colors focus:border-sky-700',
        )}
        {...props}
      />
      {children}
    </div>
  )
}

export default Input

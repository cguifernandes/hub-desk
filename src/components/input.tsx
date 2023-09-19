/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, ReactNode } from 'react'
import InputWrapper from './inputWrapper'
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
      <div className="relative flex justify-between shadow-md">
        <input
          {...register(name as 'title' | 'email' | 'password')}
          className={clsx(
            'bg-grey-525 w-[calc(100%_-_60px)] rounded-l-md border-y-2 border-l-2 border-transparent',
            'p-4 text-white placeholder-white/50 transition-colors focus:border-sky-700',
            className,
          )}
          {...props}
          style={error && { borderColor: 'rgb(239 68 68)' }}
        />
        <InputWrapper>{children}</InputWrapper>
      </div>
    )
  }

  return (
    <div className={clsx('relative flex justify-between shadow-md', className)}>
      <input
        className={clsx(
          'bg-grey-525 w-[calc(100%_-_60px)] rounded-l-md border-y-2 border-l-2 border-transparent',
          'p-4 text-white placeholder-white/50 transition-colors focus:border-sky-700',
        )}
        {...props}
      />
      <InputWrapper>{children}</InputWrapper>
    </div>
  )
}

export default Input

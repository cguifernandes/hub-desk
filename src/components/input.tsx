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
  children?: ReactNode
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
    if (children) {
      return (
        <div
          className={clsx(
            'relative flex items-center justify-between',
            className,
          )}
        >
          <input
            {...register(name as 'title' | 'email' | 'password')}
            className={clsx(
              'w-full rounded-md border border-transparent bg-button-gradient text-white',
              'px-4 py-3 placeholder-white/50 transition-colors focus:border-sky-700',
            )}
            {...props}
            style={error && { borderColor: 'rgb(239 68 68)' }}
          />
          {children}
        </div>
      )
    }

    return (
      <input
        {...register(name as 'title' | 'email' | 'password')}
        className={clsx(
          'w-full rounded-md border border-transparent bg-button-gradient text-white',
          'px-4 py-3 placeholder-white/50 transition-colors focus:border-sky-700',
          className,
        )}
        {...props}
        style={error && { borderColor: 'rgb(239 68 68)' }}
      />
    )
  }

  if (children) {
    return (
      <div
        className={clsx(
          'relative flex items-center justify-between',
          className,
        )}
      >
        <input
          className={clsx(
            'w-full rounded-md border border-transparent bg-button-gradient text-white',
            'px-4 py-3 placeholder-white/50 transition-colors focus:border-sky-700',
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
        'w-full rounded-md border border-transparent bg-button-gradient text-white',
        'px-4 py-3 placeholder-white/50 transition-colors focus:border-sky-700',
        className,
      )}
      {...props}
    />
  )
}

export default Input

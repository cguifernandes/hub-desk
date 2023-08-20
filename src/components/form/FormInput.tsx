/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register: any
  name: string
  error: FieldError | undefined
}

const FormInput = ({
  className,
  register,
  name,
  error,
  children,
  ...props
}: InputProps) => {
  if (children) {
    return (
      <>
        <div className="relative flex justify-between">
          <input
            {...register(name)}
            className={clsx(
              'w-[calc(100%_-_60px)] rounded-l-md border-2 border-transparent bg-grey-400/30 p-4 py-3',
              'text-white placeholder-white/50 transition-colors focus:border-sky-700',
              className,
            )}
            {...props}
            style={error && { borderColor: 'rgb(239 68 68)' }}
          />
          <div
            className={clsx(
              'absolute right-0 top-[50%] flex w-[60px] justify-center bg-sky-700',
              'h-full -translate-y-[50%] items-center rounded-r-md',
            )}
          >
            {children}
          </div>
        </div>
        {error && <span className="text-red-500">{error.message}</span>}
      </>
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

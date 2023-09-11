/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import InputWrapper from '@/components/inputWrapper'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register: any
  name: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
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
        <div className="relative flex justify-between shadow-md">
          <input
            {...register(name)}
            className={clsx(
              'w-[calc(100%_-_60px)] rounded-l-md border-y-2 border-l-2 border-transparent bg-grey-400/30',
              'p-4 text-white placeholder-white/50 transition-colors focus:border-sky-700',
              className,
            )}
            {...props}
            style={error && { borderColor: 'rgb(239 68 68)' }}
          />
          <InputWrapper>{children}</InputWrapper>
        </div>
        {error && (
          <span className="text-red-500">{error.message?.toString()}</span>
        )}
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

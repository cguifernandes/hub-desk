/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, ReactNode } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Input from '../input'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register?: any
  name?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const FormInput = ({
  className,
  register,
  name,
  error,
  children,
  ...props
}: InputProps) => {
  return (
    <>
      <Input
        {...props}
        name={name}
        register={register}
        className={className!}
        error={error}
      >
        {children}
      </Input>
      {error && (
        <span className="text-sm text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </>
  )
}

export default FormInput

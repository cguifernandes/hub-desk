/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextareaHTMLAttributes } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Textarea from '../textarea'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  register: any
  name: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const FormTextarea = ({
  className,
  register,
  name,
  error,
  ...props
}: TextareaProps) => {
  return (
    <>
      <Textarea
        {...props}
        className={className}
        register={register}
        name={name}
        error={error}
      />
      {error && (
        <span className="text-sm text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </>
  )
}

export default FormTextarea

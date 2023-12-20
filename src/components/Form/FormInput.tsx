/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Input from '../input'
import { FakeRDeskProps } from '@/utils/type'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register?: any
  name?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  setFakeData?: Dispatch<SetStateAction<FakeRDeskProps | undefined>>
}

const FormInput = ({
  className,
  register,
  name,
  error,
  children,
  setFakeData,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div className={className}>
      {placeholder && (
        <span className="text-sm text-white/50">{placeholder}</span>
      )}
      <Input
        {...props}
        name={name}
        register={register}
        error={error}
        setFakeData={setFakeData}
        placeholder={placeholder}
      >
        {children}
      </Input>
      {error && (
        <span className="text-sm text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </div>
  )
}

export default FormInput

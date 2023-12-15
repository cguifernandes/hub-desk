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
        setFakeData={setFakeData}
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

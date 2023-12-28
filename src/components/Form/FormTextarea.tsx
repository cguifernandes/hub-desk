/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, TextareaHTMLAttributes } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Textarea from '../textarea'
import { FakeRDeskProps } from '@/utils/type'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  register: any
  name: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  setFakeData?: Dispatch<SetStateAction<FakeRDeskProps | undefined>>
  label: string
}

const FormTextarea = ({
  className,
  register,
  name,
  error,
  setFakeData,
  label,
  placeholder,
  ...props
}: TextareaProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-white/50">{label}</label>
      <Textarea
        {...props}
        className={className}
        register={register}
        name={name}
        placeholder={placeholder}
        error={error}
        setFakeData={setFakeData}
      />
      {error && (
        <span className="text-sm text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </div>
  )
}

export default FormTextarea

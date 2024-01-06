/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Input from '../input'
import { FakeRDeskProps } from '@/utils/type'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register?: any
  name?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  setFakeData?: Dispatch<SetStateAction<FakeRDeskProps | undefined>>
  label: string
  image?: string
}

const FormInput = ({
  className,
  register,
  name,
  error,
  children,
  setFakeData,
  value,
  image,
  label,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div className={clsx('flex flex-col justify-start', className)}>
      <label className="flex items-center gap-x-2 pb-2 text-sm text-white/50 sm:pb-0">
        <img
          alt="Foto de perfil do usuário"
          src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${image}`}
          className="inline h-6 w-6 overflow-clip rounded-full object-cover object-center align-top sm:hidden"
        />
        {label}
      </label>
      <Input
        {...props}
        name={name}
        register={register}
        error={error}
        setFakeData={setFakeData}
        placeholder={placeholder}
        value={value}
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

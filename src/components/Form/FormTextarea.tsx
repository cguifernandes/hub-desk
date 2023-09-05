/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'
import InputWrapper from '@/components/inputWrapper'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  register: UseFormRegister<{
    title: string
    category:
      | 'Animes'
      | 'Desenhos'
      | 'Filmes'
      | 'Jogos'
      | 'Outros'
      | 'Séries'
      | 'Sites'
    description: string
    repo?: string | undefined
    website?: string | undefined
  }>
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
      <div className="relative flex justify-between">
        <textarea
          {...props}
          {...register(name as 'title' | 'category' | 'description')}
          className={clsx(
            'h-48 w-[calc(100%_-_60px)] resize-none rounded-l-md border-y-2 border-l-2 border-transparent text-white',
            'bg-grey-400/30 p-4 placeholder-white/50 transition-colors focus:border-sky-700',
            className,
          )}
          style={error && { borderColor: 'rgb(239 68 68)' }}
          maxLength={150}
        />
        <InputWrapper />
      </div>
      {error && (
        <span className="text-red-500">{error.message?.toString()}</span>
      )}
    </>
  )
}

export default FormTextarea

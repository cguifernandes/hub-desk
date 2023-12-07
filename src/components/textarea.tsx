/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextareaHTMLAttributes } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'
import { clsx } from 'clsx'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  register?: UseFormRegister<{
    category:
      | 'Animes'
      | 'Desenhos'
      | 'Filmes'
      | 'Jogos'
      | 'Outros'
      | 'Séries'
      | 'Sites'
    title: string
    description: string
    repo: string
    website: string
  }>
  name?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const Textarea = ({
  className,
  register,
  name,
  error,
  ...props
}: TextareaProps) => {
  if (register) {
    return (
      <div className="relative flex justify-between shadow-md">
        <textarea
          {...props}
          {...register(name as 'title' | 'category' | 'description')}
          className={clsx(
            'h-48 w-full resize-none rounded-md border border-transparent text-white',
            'bg-button-gradient px-4 py-3 placeholder-white/50 transition-colors focus:border-sky-700',
            className,
          )}
          style={error && { borderColor: 'rgb(239 68 68)' }}
        />
      </div>
    )
  }

  return (
    <div className="relative flex w-full min-w-[240px] max-w-[650px] justify-between shadow-md">
      <textarea
        {...props}
        className={clsx(
          'h-48 resize-none rounded-md border border-transparent text-white',
          'bg-button-gradient p-4 placeholder-white/50 transition-colors focus:border-sky-700',
          className,
        )}
      />
    </div>
  )
}

export default Textarea

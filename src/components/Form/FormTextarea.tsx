/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  register: any
  name: string
  error: FieldError | undefined
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
          {...register(name)}
          className={clsx(
            'h-48 w-[calc(100%_-_60px)] resize-none rounded-l-md border-y-2 border-l-2 border-transparent text-white',
            'bg-grey-400/30 p-4 placeholder-white/50 transition-colors focus:border-sky-700',
            className,
          )}
          style={error && { borderColor: 'rgb(239 68 68)' }}
          maxLength={150}
        />
        <div
          className={clsx(
            'absolute right-0 top-[50%] flex w-[60px] justify-center bg-sky-700',
            'h-full -translate-y-[50%] items-center rounded-r-md',
          )}
        />
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </>
  )
}

export default FormTextarea

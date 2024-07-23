/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react'
import clsx from 'clsx'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'
import { FakeRDeskProps } from '@/utils/type'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register?: UseFormRegister<{
    email: string
    password: string
    title: string
  }>
  name?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  setFakeData?: Dispatch<SetStateAction<FakeRDeskProps | undefined>>
}

const Input = ({
  children,
  className,
  error,
  name,
  register,
  setFakeData,
  ...props
}: InputProps) => {
  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (setFakeData) {
      const value = e.target.value === '' ? '' : e.target.value

      setFakeData((prevData) => ({
        ...prevData,
        [name as string]: value,
      }))
    }
  }

  if (register) {
    if (children) {
      return (
        <div
          className={clsx(
            'relative flex items-center justify-between rounded-md border border-transparent',
            'bg-button-gradient text-white transition-colors focus:border-blue-700',
            className,
          )}
        >
          <input
            {...register(name as 'title' | 'email' | 'password', {
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                handlerChangeValue(e),
            })}
            className="w-[calc(100%_-_58px)] bg-transparent py-3 pl-4 placeholder-white/50"
            {...props}
            style={error && { borderColor: 'rgb(239 68 68)' }}
          />
          {children}
        </div>
      )
    }

    return (
      <input
        {...register(name as 'title' | 'email' | 'password', {
          onChange: (e: ChangeEvent<HTMLInputElement>) => handlerChangeValue(e),
        })}
        className={clsx(
          'w-full rounded-md border border-transparent bg-button-gradient text-white',
          'px-4 py-3 placeholder-white/50 transition-colors focus:border-blue-700',
          className,
        )}
        {...props}
        style={error && { borderColor: 'rgb(239 68 68)' }}
      />
    )
  }

  if (children) {
    return (
      <div
        className={clsx(
          'relative flex items-center justify-between',
          className,
        )}
      >
        <input
          className={clsx(
            'w-full rounded-md border border-transparent bg-button-gradient text-white',
            'px-4 py-3 placeholder-white/50 transition-colors focus:border-blue-700',
          )}
          {...props}
        />
        {children}
      </div>
    )
  }

  return (
    <input
      className={clsx(
        'w-full rounded-md border border-transparent bg-button-gradient text-white',
        'px-4 py-3 placeholder-white/50 transition-colors focus:border-blue-700',
        className,
      )}
      {...props}
    />
  )
}

export default Input

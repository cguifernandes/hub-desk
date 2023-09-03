/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode, useState } from 'react'
import { FieldError } from 'react-hook-form'

type ImageProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  register: any
  name: string
  error?: FieldError | undefined
}

const FormImage = ({
  className,
  children,
  error,
  name,
  register,
}: ImageProps) => {
  return (
    <div className="relative flex w-full justify-between rounded-l-md bg-grey-400/30 p-4">
      <input
        {...register(name)}
        placeholder="Imagem"
        className="hidden"
        id="file-upload"
        type="file"
      />
      <label htmlFor="file-upload">
        <span className="text-white">Selecione uma imagem*</span>
      </label>
      <div
        className={clsx(
          'absolute right-0 top-[50%] flex w-[60px] justify-center bg-sky-700',
          'h-full -translate-y-[50%] items-center rounded-r-md',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default FormImage

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import clsx from 'clsx'
import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
} from 'react-hook-form'

type ImageProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  setValue: UseFormSetValue<{
    category: 'Animes' | 'Filmes' | 'Desenhos' | 'Sites' | 'Séries' | 'Outros'
    title: string
    image: string
    description: string
  }>
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const FormImage = ({ className, children, error, setValue }: ImageProps) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // const [imageUrl, setImageUrl] = useState(String)

  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]

  //   if (file) {
  //     setSelectedFile(file)

  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       const fileContent = reader.result
  //       if (typeof fileContent === 'string') {
  //         console.log(fileContent)
  //       }
  //     }

  //     reader.readAsDataURL(file)
  //   }
  // }

  return (
    <>
      <div className="relative flex w-full justify-between rounded-l-md bg-grey-400/30 p-4">
        <input
          placeholder="Imagem"
          className="hidden"
          id="file-upload"
          accept="image/*"
          type="file"
        />
        <label className="cursor-pointer text-white" htmlFor="file-upload">
          <span>
            {/* {selectedFile?.name === undefined
              ? 'Selecione uma imagem*'
              : selectedFile?.name} */}
            Selecione uma imagem*
          </span>
          <div
            className={clsx(
              'absolute right-0 top-[50%] flex w-[60px] justify-center bg-sky-700',
              'h-full -translate-y-[50%] items-center rounded-r-md',
              className,
            )}
          >
            {children}
          </div>
        </label>
      </div>
      {error && (
        <span className="text-red-500">{error.message?.toString()}</span>
      )}
    </>
  )
}

export default FormImage

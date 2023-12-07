/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormWatch,
} from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
type FormFileProps = {
  className?: string
  children: ReactNode
  register: any
  name: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  watch: UseFormWatch<{
    category:
      | 'Sites'
      | 'Animes'
      | 'Desenhos'
      | 'Filmes'
      | 'Jogos'
      | 'Outros'
      | 'Séries'
    title: string
    description: string
    repo: string
    website: string
    image?: any
  }>
}

const FormFile = ({
  children,
  className,
  error,
  name,
  watch,
  register,
}: FormFileProps) => {
  const [fileList, setFileList] = useState<FileList | null>(null)

  useEffect(() => {
    setFileList(watch('image'))
  }, [watch('image')])

  return (
    <>
      <div
        style={error && { borderColor: 'rgb(239 68 68)' }}
        className={clsx(
          'relative flex items-center justify-between rounded-md border border-transparent bg-button-gradient text-white',
          className,
        )}
      >
        <input
          {...register(name)}
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <label className="w-full  px-4 py-3" htmlFor="image">
          {fileList && fileList[0]?.name === undefined
            ? 'Escolha uma imagem'
            : fileList && fileList[0]?.name}
        </label>
        {children}
      </div>
      {error && (
        <span className="text-red-500">{error.message?.toString()}</span>
      )}
    </>
  )
}

export default FormFile

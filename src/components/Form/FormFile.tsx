/* eslint-disable react-hooks/exhaustive-deps */
import { FakeRDeskProps } from '@/utils/type'
import clsx from 'clsx'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
type FormFileProps = {
  className?: string
  children: ReactNode
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
    repo: string
    website: string
    image?: any
  }>
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  setFileList: Dispatch<SetStateAction<File | undefined>>
  fileList: File | undefined
  setFakeData?: Dispatch<SetStateAction<FakeRDeskProps | undefined>>
}

const FormFile = ({
  children,
  className,
  error,
  register,
  fileList,
  setFileList,
  setFakeData,
}: FormFileProps) => {
  const handlerChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files?.[0])

    if (setFakeData) {
      const file = e.target.files?.[0]

      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const fileContent = reader.result
          if (typeof fileContent === 'string') {
            setFakeData((prevData) => ({
              ...prevData,
              src: fileContent,
            }))
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

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
          {...register('image', {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              handlerChangeValues(e),
          })}
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <label className="w-full  px-4 py-3" htmlFor="image">
          {!fileList
            ? 'Escolha uma imagem'
            : fileList.name || 'Nome do arquivo indisponível'}
        </label>
        {children}
      </div>
      {error && (
        <span className="text-sm text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </>
  )
}

export default FormFile

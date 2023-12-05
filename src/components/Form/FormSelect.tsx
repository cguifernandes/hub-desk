/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ChevronDown } from 'lucide-react'
import { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
} from 'react-hook-form'
import Select from '../select'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  selectedDropDown: string
  setSelectedDropDown: Dispatch<SetStateAction<string>>
  setValue: UseFormSetValue<{
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
  }>
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const FormSelect = ({
  setValue,
  setSelectedDropDown,
  selectedDropDown,
  error,
}: SelectProps) => {
  const categories = [
    {
      value: 'Animes',
      id: 1,
    },
    {
      value: 'Desenhos',
      id: 2,
    },
    {
      value: 'Filmes',
      id: 3,
    },
    { value: 'Jogos', id: 4 },
    { value: 'Outros', id: 5 },
    {
      value: 'Séries',
      id: 6,
    },
    { value: 'Sites', id: 7 },
  ]

  return (
    <>
      <Select
        error={error}
        dropDownItems={categories}
        selectedDropDown={selectedDropDown}
        setSelectedDropDown={setSelectedDropDown}
        value={'Categoria*'}
        setValue={setValue}
      >
        <ChevronDown color="#fff" strokeWidth={1.5} size={22} />
      </Select>
      {error && (
        <span className="text-red-500">
          {error.type === 'invalid_type' &&
            'O campo "Categoria" é obrigatório.'}
        </span>
      )}
    </>
  )
}

export default FormSelect

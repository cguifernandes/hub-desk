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
import { categories } from '@/utils/constant'

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
        <ChevronDown color="#fff" strokeWidth={1.5} size={30} />
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

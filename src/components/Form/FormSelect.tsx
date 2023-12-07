/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ChevronDown } from 'lucide-react'
import { InputHTMLAttributes } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Select from '../select'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  selectedDropDown: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  handlerClickSelect: (value: any) => void
}

const FormSelect = ({
  selectedDropDown,
  error,
  handlerClickSelect,
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
        value={'Categoria*'}
        handlerClickSelect={handlerClickSelect}
      >
        <ChevronDown color="#fff" strokeWidth={1.5} size={22} />
      </Select>
      {error && (
        <span className="text-sm text-red-500">
          {error.type === 'invalid_type' &&
            'O campo "Categoria" é obrigatório.'}
        </span>
      )}
    </>
  )
}

export default FormSelect

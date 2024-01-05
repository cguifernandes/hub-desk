/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Select from '../select'
import { FakeRDeskProps } from '@/utils/type'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  selectedDropDown: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  handlerClickSelect: (value: any) => void
  setFakeData?: Dispatch<SetStateAction<FakeRDeskProps | undefined>>
  className?: string
  label: string
  value?: string | (readonly string[] & string)
  dropDownItems?: {
    id: number
    value: any
  }[]
}

const FormSelect = ({
  selectedDropDown,
  error,
  handlerClickSelect,
  className,
  dropDownItems,
  value,
  label,
  style,
  ...props
}: SelectProps) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false)

  return (
    <div className="w-full sm:w-1/2">
      <label className="text-sm text-white/50">{label}</label>
      <Select
        error={error}
        style={style}
        {...props}
        dropDownItems={dropDownItems}
        selectedDropDown={selectedDropDown}
        handlerClickSelect={handlerClickSelect}
        className={className}
        setVisibleDropDown={setVisibleDropDown}
        visibleDropDown={visibleDropDown}
        value={value!}
      />
      {error && (
        <span className="text-sm text-red-500">
          {error.type === 'invalid_type' &&
            'O campo "Categoria" é obrigatório.'}
        </span>
      )}
    </div>
  )
}

export default FormSelect

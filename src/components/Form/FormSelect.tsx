/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import clsx from 'clsx'
import {
  Brush,
  Clapperboard,
  Globe,
  Monitor,
  Plus,
  Popcorn,
} from 'lucide-react'
import { InputHTMLAttributes, ReactNode, useState } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
} from 'react-hook-form'
import InputWrapper from './inputWrapper'
import { motion } from 'framer-motion'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  children?: ReactNode
  setValue: UseFormSetValue<{
    title: string
    category: 'Animes' | 'Filmes' | 'Séries' | 'Desenhos' | 'Sites' | 'Outros'
    description: string
  }>
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const FormSelect = ({ children, className, setValue }: SelectProps) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false)
  const [selectedDropDown, setSelectedDropDown] = useState('')
  const categories = [
    { name: 'Animes', icon: <Monitor /> },
    { name: 'Filmes', icon: <Clapperboard /> },
    { name: 'Séries', icon: <Popcorn /> },
    { name: 'Desenhos', icon: <Brush /> },
    { name: 'Sites', icon: <Globe /> },
    { name: 'Outros', icon: <Plus /> },
  ]

  return (
    <div className="relative flex justify-between">
      <div
        onClick={() => setVisibleDropDown(!visibleDropDown)}
        className={clsx(
          'h-[60px] w-[calc(100%_-_60px)] rounded-l-md border-y-2',
          'cursor-pointer border-l-2 border-transparent bg-grey-400/30 p-4',
          className,
        )}
      >
        <span
          style={
            selectedDropDown === ''
              ? { color: 'rgb(255 255 255 / 0.5)' }
              : { color: 'white' }
          }
          className="select-none"
        >
          {selectedDropDown === '' ? 'Categoria*' : selectedDropDown}
        </span>
      </div>
      <InputWrapper onClick={() => setVisibleDropDown(!visibleDropDown)}>
        {children}
      </InputWrapper>
      {visibleDropDown && (
        <motion.div
          initial={{ translateY: -20 }}
          animate={{ translateY: 0 }}
          transition={{ type: 'keyframes', duration: 0.3 }}
          className="bg-grey-650 absolute top-20 z-20 w-full select-none rounded-md shadow-lg"
        >
          <ul className="flex flex-col text-white">
            {categories.map((categories) => (
              <li
                onClick={() => {
                  setSelectedDropDown(categories.name)
                  setVisibleDropDown(false)
                  setValue(
                    'category',
                    categories.name as
                      | 'Animes'
                      | 'Filmes'
                      | 'Séries'
                      | 'Desenhos'
                      | 'Sites'
                      | 'Outros',
                  )
                }}
                className="group relative flex cursor-pointer justify-between"
                key={categories.name}
              >
                <span
                  className={clsx(
                    'w-[calc(100%_-_60px)] border-2 border-r-0 group-first:rounded-tl-md group-last:rounded-bl-md',
                    'border-transparent p-4 duration-200 ease-out hover:border-sky-700',
                  )}
                >
                  {categories.name}
                </span>
                <InputWrapper className="!rounded-none group-first:!rounded-tr-md group-last:!rounded-br-md">
                  {categories.icon}
                </InputWrapper>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default FormSelect

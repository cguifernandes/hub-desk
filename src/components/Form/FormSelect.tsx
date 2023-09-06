/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import clsx from 'clsx'
import {
  Brush,
  Clapperboard,
  Gamepad2,
  Globe,
  Monitor,
  Plus,
  Popcorn,
} from 'lucide-react'
import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
} from 'react-hook-form'
import InputWrapper from '@/components/inputWrapper'
import { motion } from 'framer-motion'

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
  children,
  className,
  setValue,
  setSelectedDropDown,
  selectedDropDown,
  error,
}: SelectProps) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false)
  const categories = [
    {
      name: 'Animes',
      icon: <Monitor color="#fff" strokeWidth={1.5} />,
    },
    {
      name: 'Desenhos',
      icon: <Brush color="#fff" strokeWidth={1.5} />,
    },
    {
      name: 'Filmes',
      icon: <Clapperboard color="#fff" strokeWidth={1.5} />,
    },
    { name: 'Jogos', icon: <Gamepad2 color="#fff" strokeWidth={1.5} /> },
    { name: 'Outros', icon: <Plus color="#fff" strokeWidth={1.5} /> },
    {
      name: 'Séries',
      icon: <Popcorn color="#fff" strokeWidth={1.5} />,
    },
    { name: 'Sites', icon: <Globe color="#fff" strokeWidth={1.5} /> },
  ]

  return (
    <>
      <div className="relative flex justify-between">
        <div
          onClick={() => setVisibleDropDown(!visibleDropDown)}
          style={error && { borderColor: 'rgb(239 68 68)' }}
          className={clsx(
            'w-[calc(100%_-_60px)] rounded-l-md border-2 border-y-2 border-r-0',
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
        <InputWrapper
          className="cursor-pointer"
          onClick={() => setVisibleDropDown(!visibleDropDown)}
        >
          {children}
        </InputWrapper>
        {visibleDropDown && (
          <motion.div
            initial={{ translateY: -20 }}
            animate={{ translateY: 0 }}
            transition={{ type: 'keyframes', duration: 0.3 }}
            className="absolute top-20 z-20 w-full select-none rounded-md bg-grey-650 shadow-lg"
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
                        | 'Outros'
                        | 'Jogos',
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
                  <InputWrapper className="cursor-pointer !rounded-none group-first:!rounded-tr-md group-last:!rounded-br-md">
                    {categories.icon}
                  </InputWrapper>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
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

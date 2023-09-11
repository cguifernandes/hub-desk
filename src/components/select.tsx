import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import InputWrapper from './inputWrapper'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { UseFormSetValue } from 'react-hook-form'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode
  value: string
  className?: string
  dropDownItems: { name: string; id: number }[]
  selectedDropDown: string
  setSelectedDropDown: Dispatch<SetStateAction<string>>
  setValue?: UseFormSetValue<{
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
}

const Select = ({
  children,
  value,
  className,
  dropDownItems,
  setSelectedDropDown,
  setValue,
  selectedDropDown,
}: SelectProps) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false)

  const handlerClickSelect = (categories: { name: string; id: number }) => {
    setSelectedDropDown(categories.name)

    if (setValue) {
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
    }
  }

  return (
    <div
      onClick={() => setVisibleDropDown(!visibleDropDown)}
      className={clsx('relative flex justify-between shadow-md', className)}
    >
      <input
        style={
          selectedDropDown
            ? { color: 'white' }
            : { color: 'rgb(255 255 255 / 0.5)' }
        }
        className={clsx(
          'w-[calc(100%_-_60px)] rounded-l-md border-2 border-y-2 border-r-0',
          'cursor-pointer select-none border-l-2 border-transparent bg-grey-400/30 p-4',
        )}
        value={selectedDropDown || value}
        readOnly
      />
      <InputWrapper className="cursor-pointer">{children}</InputWrapper>
      {visibleDropDown && (
        <motion.div
          initial={{ translateY: -10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'keyframes', duration: 0.3 }}
          className="absolute top-20 z-20 w-full select-none rounded-md bg-grey-650 shadow-md"
        >
          {dropDownItems.map((item) => (
            <ul key={item.name} className="group flex flex-col text-white">
              <li
                onClick={() => handlerClickSelect(item)}
                className={clsx(
                  'w-full cursor-pointer group-last:rounded-b-md',
                  'ease-ou p-4 duration-200 hover:bg-grey-400 group-first:rounded-t-md',
                )}
              >
                {item.name}
              </li>
            </ul>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Select

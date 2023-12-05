/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from 'react'
import clsx from 'clsx'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import AnimationWrapper from './animationWrapper'
import { ChevronDown } from 'lucide-react'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  className?: string
  dropDownItems: { id: number; value: any }[]
  selectedDropDown: string | number
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  handlerClickSelect: (value: any) => void
}

const Select = ({
  value,
  className,
  dropDownItems,
  selectedDropDown,
  error,
  handlerClickSelect,
}: SelectProps) => {
  const [visibleDropDown, setVisibleDropDown] = useState(false)

  return (
    <div
      onClick={() => setVisibleDropDown(!visibleDropDown)}
      className={clsx(
        'relative flex h-full cursor-pointer items-center',
        className,
      )}
    >
      <input
        style={{
          color: selectedDropDown ? 'white' : 'rgba(255, 255, 255, 0.5)',
          ...(error && { border: '2px solid rgb(239, 68, 68)' }),
        }}
        className="w-full cursor-pointer select-none rounded-md border border-grey-400 bg-grey-500 px-4 py-3"
        value={selectedDropDown || value}
        readOnly
      />
      <ChevronDown
        style={{
          transform: visibleDropDown ? 'rotate(0deg)' : 'rotate(-90deg)',
        }}
        className="absolute right-4 rotate-3 duration-200 ease-out"
        color="#fff"
        strokeWidth={1.5}
        size={22}
      />
      {visibleDropDown && (
        <AnimationWrapper
          initial={{ translateY: -10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          className="absolute top-14 z-20 w-full select-none rounded-md border border-grey-400 bg-grey-700 shadow-md"
        >
          {dropDownItems.map((item) => (
            <ul key={item.id} className="group flex flex-col text-white">
              <li
                onClick={() => handlerClickSelect(item.value)}
                className={clsx(
                  'w-full cursor-pointer py-3 ease-out group-last:rounded-b-md',
                  'px-4 duration-200 hover:bg-grey-500 group-first:rounded-t-md',
                )}
              >
                {item.value}
              </li>
            </ul>
          ))}
        </AnimationWrapper>
      )}
    </div>
  )
}

export default Select

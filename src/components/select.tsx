/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  className?: string
  dropDownItems?: { id: number; value: any }[]
  selectedDropDown?: string | number | undefined
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  handlerClickSelect?: (value: any) => void
  children?: ReactNode
  setQuery?: Dispatch<SetStateAction<string>>
  setVisibleDropDown: Dispatch<SetStateAction<boolean>>
  visibleDropDown: boolean
}

const Select = ({
  value,
  className,
  dropDownItems,
  selectedDropDown,
  error,
  style,
  setQuery,
  handlerClickSelect,
  setVisibleDropDown,
  visibleDropDown,
  children,
  ...props
}: SelectProps) => {
  const handlerClick = () => {
    if (children && setQuery) {
      setQuery('')
      setVisibleDropDown(!visibleDropDown)
    }
  }

  return (
    <div
      onClick={
        children ? undefined : () => setVisibleDropDown(!visibleDropDown)
      }
      className={clsx('relative flex items-center', className)}
    >
      {visibleDropDown && (
        <div
          onClick={() => setVisibleDropDown(false)}
          className="fixed left-0 top-0 z-20 h-screen w-screen bg-grey-900/40 lg:bg-transparent"
        />
      )}
      <input
        {...props}
        style={{
          ...style,
          ...(error ? { border: '2px solid rgb(239, 68, 68)' } : {}),
        }}
        className="w-full cursor-pointer select-none rounded-md bg-button-gradient px-4 py-3 text-white placeholder-white/50"
        value={selectedDropDown || value}
        onClick={handlerClick}
        readOnly
      />
      <ChevronDown
        style={{
          transform: visibleDropDown ? 'rotate(0deg)' : 'rotate(-90deg)',
        }}
        className="absolute right-4 z-20 rotate-3 duration-200 ease-out"
        color="#fff"
        strokeWidth={1.5}
        size={22}
      />
      <AnimatePresence>
        {visibleDropDown && (
          <motion.div
            initial={{ translateY: -10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'keyframes', duration: 0.2 }}
            style={style}
            className="absolute top-14 z-30 w-full select-none rounded-md border border-grey-400 bg-modal-gradient shadow-md backdrop-blur-md"
          >
            {children || (
              <ul className="group flex flex-col text-white">
                {dropDownItems?.map((item) => (
                  <li
                    key={item.id}
                    onClick={() =>
                      handlerClickSelect && handlerClickSelect(item.value)
                    }
                    className={clsx(
                      'w-full cursor-pointer py-3 ease-out group-last:rounded-b-md',
                      'px-4 duration-200 hover:bg-grey-500 group-first:rounded-t-md',
                    )}
                  >
                    {item.value}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select

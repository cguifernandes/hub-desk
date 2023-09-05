import clsx from 'clsx'
import { ReactNode } from 'react'

type InputWrapperProps = {
  children?: ReactNode
  onClick?: () => void
  className?: string
}

const InputWrapper = ({ children, onClick, className }: InputWrapperProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'absolute right-0 top-[50%] flex w-[60px] justify-center bg-sky-700',
        'h-full -translate-y-[50%] items-center rounded-r-md',
        className,
      )}
    >
      {children && children}
    </div>
  )
}

export default InputWrapper

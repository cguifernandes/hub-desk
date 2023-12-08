import clsx from 'clsx'
import { ReactNode } from 'react'

type ModalRootProps = {
  children: ReactNode
  visibleModal: boolean
  className?: string
}

const ModalRoot = ({ children, visibleModal, className }: ModalRootProps) => {
  return (
    <>
      {visibleModal && (
        <div
          className={clsx(
            'fixed left-0 top-0 z-20 flex h-screen w-screen',
            className,
          )}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default ModalRoot

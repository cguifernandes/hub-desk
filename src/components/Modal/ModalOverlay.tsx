'use client'
import clsx from 'clsx'
import { ReactNode } from 'react'

type ModalOverlay = {
  onClick: () => void
  visibleModal: boolean
  children?: ReactNode
  className?: string
}

const ModalOverlay = ({
  onClick,
  visibleModal,
  children,
  className,
}: ModalOverlay) => {
  if (children) {
    return (
      <div
        style={visibleModal ? { opacity: 1 } : { opacity: 0 }}
        onClick={onClick}
        className={clsx(
          'fixed left-0 top-0 z-10 h-screen w-screen bg-grey-900/50',
          className,
        )}
      >
        {children}
      </div>
    )
  } else {
    return (
      <div
        style={visibleModal ? { opacity: 1 } : { opacity: 0 }}
        onClick={onClick}
        className="fixed left-0 top-0 z-10 h-screen w-screen bg-grey-900/50"
      />
    )
  }
}

export default ModalOverlay

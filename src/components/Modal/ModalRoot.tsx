import { ReactNode } from 'react'

type ModalRootProps = {
  children: ReactNode
  visibleModal: boolean
}

const ModalRoot = ({ children, visibleModal }: ModalRootProps) => {
  return (
    <>
      {visibleModal && (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-screen items-start justify-end">
          {children}
        </div>
      )}
    </>
  )
}

export default ModalRoot

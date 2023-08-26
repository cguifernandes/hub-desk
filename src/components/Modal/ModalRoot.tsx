import { ReactNode } from 'react'

type ModalRootProps = {
  children: ReactNode
}

const ModalRoot = ({ children }: ModalRootProps) => {
  return (
    <div className="fixed left-0 top-0 z-20 flex h-screen w-screen items-start justify-end">
      {children}
    </div>
  )
}

export default ModalRoot

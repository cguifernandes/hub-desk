import { ReactNode } from 'react'

type ModalOverlay = {
  children: ReactNode
}

const ModalOverlay = ({ children }: ModalOverlay) => {
  return <div className="h-screen w-screen">{children}</div>
}

export default ModalOverlay

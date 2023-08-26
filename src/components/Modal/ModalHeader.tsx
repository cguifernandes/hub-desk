import { ReactNode } from 'react'

type ModalHeader = {
  children: ReactNode
}

const ModalHeader = ({ children }: ModalHeader) => {
  return <>{children}</>
}

export default ModalHeader

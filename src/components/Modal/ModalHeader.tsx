import { ReactNode } from 'react'

type ModalHeader = {
  children: ReactNode
  className?: string
}

const ModalHeader = ({ children, className }: ModalHeader) => {
  return <header className={className}>{children}</header>
}

export default ModalHeader

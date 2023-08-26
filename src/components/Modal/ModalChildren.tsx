import { ReactNode } from 'react'

type ModalChildren = {
  children: ReactNode
}

const ModalChildren = ({ children }: ModalChildren) => {
  return { children }
}

export default ModalChildren

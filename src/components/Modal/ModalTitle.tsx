import { ReactNode } from 'react'
import Heading from '../Typography/heading'

type ModalTitle = {
  children: ReactNode
}

const ModalTitle = ({ children }: ModalTitle) => {
  return <Heading>{children}</Heading>
}

export default ModalTitle

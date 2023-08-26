import { ReactNode } from 'react'

type ModalChildren = {
  children: ReactNode
}

const ModalChildren = ({ children }: ModalChildren) => {
  return (
    <div className="z-20 h-36 w-32 rounded-md bg-grey-600 p-10 shadow-lg">
      {children}
    </div>
  )
}

export default ModalChildren

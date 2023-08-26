import { ReactNode } from 'react'

type ModalOverlay = {
  children?: ReactNode
  onClick: () => void
}

const ModalOverlay = ({ onClick }: ModalOverlay) => {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 z-10 h-screen w-screen bg-grey-700/30 backdrop-blur-sm"
    />
  )
}

export default ModalOverlay

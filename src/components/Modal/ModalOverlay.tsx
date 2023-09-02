'use client'
type ModalOverlay = {
  onClick: () => void
  visibleModal: boolean
}

const ModalOverlay = ({ onClick, visibleModal }: ModalOverlay) => {
  return (
    <div
      style={visibleModal ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClick}
      className="fixed left-0 top-0 z-10 h-screen w-screen bg-grey-700/30 backdrop-blur-sm"
    />
  )
}

export default ModalOverlay

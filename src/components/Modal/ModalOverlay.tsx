'use client'
import { Variants, motion } from 'framer-motion'

type ModalOverlay = {
  onClick: () => void
  visibleModal: boolean
}

const ModalOverlay = ({ onClick, visibleModal }: ModalOverlay) => {
  const animationModal: Variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  }

  return (
    <motion.div
      animate={visibleModal ? 'visible' : 'hidden'}
      transition={{ type: 'keyframes' }}
      variants={animationModal}
      onClick={onClick}
      className="fixed left-0 top-0 z-10 h-screen w-screen bg-grey-700/30 backdrop-blur-sm"
    />
  )
}

export default ModalOverlay

'use client'
import { ReactNode } from 'react'
import { Variants, motion } from 'framer-motion'

type ModalChildren = {
  children: ReactNode
  className: string
  visibleModal: boolean
}

const ModalChildren = ({
  children,
  className,
  visibleModal,
}: ModalChildren) => {
  const animationModal: Variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  }

  return (
    <motion.aside
      animate={visibleModal ? 'visible' : 'hidden'}
      transition={{ type: 'keyframes' }}
      className={className}
      variants={animationModal}
    >
      {children}
    </motion.aside>
  )
}

export default ModalChildren

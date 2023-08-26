'use client'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type ModalChildren = {
  children: ReactNode
  className: string
}

const ModalChildren = ({ children, className }: ModalChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'keyframes' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ModalChildren

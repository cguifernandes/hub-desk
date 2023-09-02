'use client'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type ModalChildren = {
  children: ReactNode
  className: string
}

const ModalChildren = ({ children, className }: ModalChildren) => {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'keyframes' }}
      className={className}
    >
      {children}
    </motion.aside>
  )
}

export default ModalChildren

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

type ModalRootProps = {
  children: ReactNode
  visibleModal: boolean
  className?: string
}

const ModalRoot = ({ children, visibleModal, className }: ModalRootProps) => {
  return (
    <AnimatePresence>
      {visibleModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'keyframes', duration: 0.1 }}
          className={clsx(
            'fixed left-0 top-0 z-20 !m-0 flex h-screen w-screen',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalRoot

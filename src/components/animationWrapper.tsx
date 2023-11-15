'use client'
import { ReactNode } from 'react'
import { AnimationProps, motion } from 'framer-motion'

type AnimationWrapperProps = {
  className: string
  delay?: number
  children: ReactNode
  initial?: AnimationProps['initial']
  animate?: AnimationProps['animate']
}

const AnimationWrapper = ({
  className,
  delay,
  children,
  animate,
  initial,
}: AnimationWrapperProps) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ type: 'keyframes', delay: delay ? 0.4 : 0, duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper

'use client'
import { ReactNode } from 'react'
import {
  AnimationProps,
  TargetAndTransition,
  VariantLabels,
  motion,
} from 'framer-motion'

type AnimationWrapperProps = {
  className: string
  delay?: number
  children: ReactNode
  initial?: AnimationProps['initial']
  animate?: AnimationProps['animate']
  whileInView?: VariantLabels | TargetAndTransition | undefined
}

const AnimationWrapper = ({
  className,
  delay,
  children,
  animate,
  initial,
  whileInView,
}: AnimationWrapperProps) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={{ type: 'keyframes', delay: delay ? 0.4 : 0, duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper

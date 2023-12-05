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
  component?: 'button' | 'div'
}

const AnimationWrapper = ({
  className,
  delay,
  children,
  animate,
  initial,
  whileInView,
  component = 'div',
}: AnimationWrapperProps) => {
  const Pattern = component === 'button' ? motion.button : motion.div

  return (
    <Pattern
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={{ type: 'keyframes', delay: delay ? 0.4 : 0, duration: 0.4 }}
      className={className}
    >
      {children}
    </Pattern>
  )
}

export default AnimationWrapper

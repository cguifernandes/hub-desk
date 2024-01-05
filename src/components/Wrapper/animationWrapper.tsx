'use client'
import { CSSProperties, ReactNode } from 'react'
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
  exit?: AnimationProps['exit']
  whileInView?: VariantLabels | TargetAndTransition | undefined
  component?: 'button' | 'div'
  style?: CSSProperties
}

const AnimationWrapper = ({
  className,
  delay,
  children,
  animate,
  initial,
  whileInView,
  style,
  exit,
  component = 'div',
}: AnimationWrapperProps) => {
  const Pattern = component === 'button' ? motion.button : motion.div

  return (
    <Pattern
      initial={initial}
      animate={animate}
      exit={exit}
      style={style}
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

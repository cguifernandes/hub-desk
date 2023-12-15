'use client'
import { AnimationProps, motion } from 'framer-motion'
import { FormEventHandler, ReactNode } from 'react'

type FormRootProps = {
  className?: string
  children: ReactNode
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  initial?: AnimationProps['initial']
  animate?: AnimationProps['animate']
}

const FormRoot = ({
  className,
  children,
  handleSubmit,
  animate,
  initial,
}: FormRootProps) => {
  const Pattern = animate ? motion.form : 'form'

  return (
    <Pattern
      animate={animate}
      initial={initial}
      onSubmit={handleSubmit}
      className={className}
      transition={{ type: 'keyframes', duration: 0.4 }}
    >
      {children}
    </Pattern>
  )
}

export default FormRoot

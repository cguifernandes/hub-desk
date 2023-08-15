'use client'
import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import clsx from 'clsx'

type MenuProps = {
  className: string
}

export const IconNavBar = ({ className }: MenuProps) => {
  const [visibleNavBar, setVisibleNavBar] = useState(true)

  const top: Variants = {
    visible: {
      rotate: 0,
      translateY: 0,
    },

    hidden: {
      rotate: 45,
      translateY: 8,
    },
  }

  const center: Variants = {
    visible: {
      opacity: 1,
    },

    hidden: {
      opacity: 0,
    },
  }

  const bottom: Variants = {
    visible: {
      rotate: 0,
      translateY: 0,
    },

    hidden: {
      rotate: -45,
      translateY: -8,
    },
  }

  return (
    <motion.div
      animate={visibleNavBar ? 'visible' : 'hidden'}
      transition={{ type: 'keyframes' }}
      className={clsx(
        'h-[24px] w-[24px] flex-col items-center justify-center gap-y-[6px]',
        className,
      )}
      onClick={() => setVisibleNavBar(!visibleNavBar)}
    >
      <motion.div variants={top} className="h-[2px] w-[25px] bg-white" />
      <motion.div variants={center} className="h-[2px] w-[25px] bg-white" />
      <motion.div variants={bottom} className="h-[2px] w-[25px] bg-white" />
    </motion.div>
  )
}

'use client'
import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import clsx from 'clsx'
import Text from '../text'
import Button from '../button'

type MenuProps = {
  className?: string
  visibleNavBar?: boolean
}

const Icon = ({ className }: MenuProps) => {
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
    <>
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
      <SideBar visibleNavBar={visibleNavBar} />
    </>
  )
}

export const SideBar = ({ visibleNavBar }: MenuProps) => {
  const visible: Variants = {
    visible: {
      translateX: '0px',
    },

    hidden: {
      translateX: '280px',
    },
  }

  return (
    <motion.aside
      transition={{ type: 'keyframes' }}
      initial={false}
      animate={!visibleNavBar ? 'visible' : 'hidden'}
      variants={visible}
      className={clsx(
        'fixed right-0 top-[10vh] z-50 flex h-[90vh] w-[280px] flex-col items-center bg-grey-600/60',
        'justify-around text-white backdrop-blur md:hidden',
      )}
    >
      <a href="/" className="text-xl transition-colors hover:text-grey-100">
        Animes
      </a>
      <a href="/" className="text-xl transition-colors hover:text-grey-100">
        Filmes
      </a>
      <a href="/" className="text-xl transition-colors hover:text-grey-100">
        Desenhos
      </a>
      <a href="/" className="text-xl transition-colors hover:text-grey-100">
        Sites
      </a>
      <a href="/" className="text-xl transition-colors hover:text-grey-100">
        Séries
      </a>
      <a href="/" className="text-xl transition-colors hover:text-grey-100">
        Outros
      </a>
      <div className="flex w-full flex-col items-center gap-y-4">
        <Button href="/sign-in" fill="empty" text="Login" className="w-8/12" />
        <Button href="/sign-up" text="Registrar" className="w-8/12" />
      </div>
    </motion.aside>
  )
}

export default Icon

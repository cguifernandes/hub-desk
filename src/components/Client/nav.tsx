/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useConnection from '@/hooks/useConnection'
import { ReactNode, useEffect, useState } from 'react'
import ModalBar from './modal'
import Skeleton from '../skeleton'
import Button from '../button'

const Nav = ({ children }: { children: ReactNode }) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isConnected } = useConnection()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {!mounted ? (
        <Skeleton height={44} width={44} className="!rounded-full" />
      ) : isConnected ? (
        <button
          onClick={() => setVisibleModal(!visibleModal)}
          className="h-11 w-11"
        >
          {children}
        </button>
      ) : (
        <>
          <nav className="hidden gap-x-5 md:flex">
            <Button
              href="auth/sign-in"
              fill="empty"
              text="Login"
              className="w-44"
            />
            <Button href="auth/sign-up" text="Registrar" className="w-44" />
          </nav>
          <button
            onClick={() => setVisibleModal(true)}
            className="inline h-6 w-8 space-y-2 md:hidden"
          >
            <div className="h-[2px] w-8 bg-white" />
            <div className="h-[2px] w-8 bg-white" />
            <div className="h-[2px] w-8 bg-white" />
          </button>
        </>
      )}
      {visibleModal && <ModalBar setVisibleModal={setVisibleModal} />}
    </>
  )
}

export default Nav

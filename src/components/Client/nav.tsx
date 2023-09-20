/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import ModalBar from './modal'
import Skeleton from '@/components/Layout/skeleton'
import Button from '../button'
import useClient from '@/hooks/useClient'
import useConnection from '@/hooks/useConnection'

const Nav = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isConnected } = useClient()
  const { client, isLoading } = useConnection()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {!mounted || isLoading ? (
        <Skeleton height={44} width={44} isRoundedFull />
      ) : isConnected ? (
        <button
          onClick={() => setVisibleModal(!visibleModal)}
          className="h-11 w-11"
        >
          <img
            key={client[0]?.password}
            alt={client[0]?.name}
            src={client[0]?.pfp}
            className="h-11 w-11 overflow-clip rounded-full object-cover object-center align-top"
          />
        </button>
      ) : (
        <>
          <nav className="hidden gap-x-5 md:flex">
            <Button
              href="/auth/sign-in"
              fill="empty"
              text="Login"
              className="w-44"
            />
            <Button href="/auth/sign-up" text="Registrar" className="w-44" />
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
      <ModalBar visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </>
  )
}

export default Nav

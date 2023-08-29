/* eslint-disable @next/next/no-img-element */
'use client'
import useConnection from '@/hooks/useConnection'
import { useEffect, useState } from 'react'
import ModalBar from './modal'
import Skeleton from '../skeleton'
import Button from '../button'

const Nav = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [mounted, setMounted] = useState(true)
  const { client, isConnected, isLoading } = useConnection()

  useEffect(() => {
    setMounted(false)
  }, [])

  if (mounted) {
    return <Skeleton height={42} width={272} />
  }

  return (
    <>
      {isLoading ? (
        <Skeleton height={38} width={38} className="!rounded-full" />
      ) : isConnected ? (
        client.map((client) => {
          return (
            <button
              onClick={() => setVisibleModal(!visibleModal)}
              className="h-9 w-9"
              key={client.id}
            >
              <img
                alt={client.name}
                src={client.pfp}
                className="h-10 w-10 overflow-clip rounded-full object-cover object-center align-top"
              />
            </button>
          )
        })
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

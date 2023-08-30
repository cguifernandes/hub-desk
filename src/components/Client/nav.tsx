/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useConnection from '@/hooks/useConnection'
import { useLayoutEffect, useState } from 'react'
import ModalBar from './modal'
import Skeleton from '../skeleton'
import Button from '../button'
import Heading from '../Typography/heading'
import Loading from '../loading'

const Nav = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { client, isConnected, isLoading } = useConnection()

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Heading className="flex items-center gap-x-4">
        Loading <Loading className="h-6 w-6" />
      </Heading>
    )
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

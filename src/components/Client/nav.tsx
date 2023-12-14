'use client'
/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../button'
import Search from '../Layout/search'
import useConnection from '@/hooks/useConnection'
import useClient from '@/hooks/useClient'
import { useEffect, useState } from 'react'
import Skeleton from '../Layout/skeleton'
import ModalBar from './modal'

const Nav = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isConnected } = useClient()
  const { client, isLoading } = useConnection()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center gap-x-6">
      {isLoading || !mounted ? (
        <>
          <Skeleton height={48} width={144} />
          <Skeleton height={48} width={144} />
        </>
      ) : isConnected ? (
        <>
          <Search />
          <button
            onClick={() => setVisibleModal(!visibleModal)}
            className="h-11 w-11"
          >
            <img
              key={client[0]?.password}
              alt={client[0]?.user}
              src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client[0]?.pfp}`}
              className="h-11 w-11 overflow-clip rounded-full object-cover object-center align-top"
            />
          </button>
        </>
      ) : (
        <>
          <nav className="hidden gap-x-5 md:flex">
            <Button
              fill="empty"
              text="Login"
              href="/auth/sign-in"
              className="w-36"
            />
            <Button href="/auth/sign-up" text="Registrar" className="w-36" />
          </nav>
          <button
            onClick={() => setVisibleModal(true)}
            className="inline w-6 space-y-[6px] md:hidden"
          >
            <div className="h-[2px] w-6 bg-white" />
            <div className="h-[2px] w-6 bg-white" />
            <div className="h-[2px] w-6 bg-white" />
          </button>
        </>
      )}
      <ModalBar visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </div>
  )
}

export default Nav

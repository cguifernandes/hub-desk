/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import ModalBar from './modal'
import Skeleton from '@/components/Layout/skeleton'
import Button from '../button'
import useClient from '@/hooks/useClient'
import useConnection from '@/hooks/useConnection'
import Search from '../Layout/search'

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
      {!mounted || isLoading ? (
        <Skeleton height={44} width={44} isRoundedFull />
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
              href="/auth/sign-in"
              fill="empty"
              text="Login"
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

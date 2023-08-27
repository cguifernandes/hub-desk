/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
'use client'
import useConnection from '@/hooks/useConnection'
import { useState } from 'react'
import ModalBar from './modal'
import Skeleton from '../skeleton'

const Nav = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const { isLoading, client, isConnected } = useConnection()

  if (isLoading) {
    return <Skeleton height={38} width={38} className="!rounded-full" />
  }

  return (
    <>
      {isConnected ? (
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
        <button
          onClick={() => setVisibleModal(true)}
          className="h-6 w-8 space-y-2"
        >
          <div className="h-[2px] w-8 bg-white" />
          <div className="h-[2px] w-8 bg-white" />
          <div className="h-[2px] w-8 bg-white" />
        </button>
      )}
      {visibleModal && <ModalBar setVisibleModal={setVisibleModal} />}
    </>
  )
}

export default Nav

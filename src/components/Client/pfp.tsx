'use client'
/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
import { ClientsProps } from '@/utils/type'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { useState } from 'react'
import ModalBar from './modal'

type PfpProps = {
  client: ClientsProps[]
  user_session: RequestCookie | undefined
}

const Pfp = ({ client, user_session }: PfpProps) => {
  const [visibleModal, setVisibleModal] = useState(false)

  if (user_session) {
    return (
      <>
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
        <ModalBar
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
        />
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setVisibleModal(true)}
        className="inline w-6 space-y-[6px] md:hidden"
      >
        <div className="h-[2px] w-6 bg-white" />
        <div className="h-[2px] w-6 bg-white" />
        <div className="h-[2px] w-6 bg-white" />
      </button>
      <ModalBar visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </>
  )
}

export default Pfp

'use client'
import { Modal } from '@/components/Modal'
import { ClientsProps } from '@/utils/type'
import Image from 'next/image'
import { useState } from 'react'

type ModalUser = {
  client: ClientsProps
}

const ModalUser = ({ id, name, pfp }: ClientsProps) => {
  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <>
      {visibleModal ? (
        <Modal.Root>
          <Modal.Overlay onClick={() => setVisibleModal(false)} />
          <Modal.Children>
            <Modal.Title>OI</Modal.Title>
            <button className="h-9 w-9" key={id}>
              <Image
                alt={name}
                src={pfp}
                width={36}
                height={36}
                quality={100}
                className="rounded-full"
              />
            </button>
          </Modal.Children>
        </Modal.Root>
      ) : (
        <button
          onClick={() => setVisibleModal(true)}
          className="h-9 w-9"
          key={id}
        >
          <Image
            alt={name}
            src={pfp}
            width={36}
            height={36}
            quality={100}
            className="rounded-full"
          />
        </button>
      )}
    </>
  )
}

export default ModalUser

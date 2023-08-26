'use client'
import { Modal } from '@/components/Modal'
import { ClientsProps } from '@/utils/type'
import Image from 'next/image'
import { useState } from 'react'
import Heading from '../Typography/heading'
import Topics from '../topics'
import Button from '../button'
import { LogOut, Settings } from 'lucide-react'
import Line from '../line'
import useConnection from '@/hooks/useConnection'

const ModalBar = ({ id, name, pfp }: ClientsProps) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const { isConnected } = useConnection()

  return (
    <>
      <button
        onClick={() => setVisibleModal(!visibleModal)}
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
      {visibleModal && (
        <Modal.Root>
          <Modal.Overlay onClick={() => setVisibleModal(false)} />
          <Modal.Children className="z-20 m-10 mt-28 max-h-[calc(90%_-_92px)] w-[380px] overflow-y-auto rounded-md bg-grey-600 p-10 shadow-lg sm:w-[450px]">
            <Modal.Header>
              {isConnected && (
                <div className="flex flex-col items-center justify-between gap-y-8">
                  <Image
                    alt={name}
                    src={pfp}
                    width={80}
                    height={80}
                    quality={100}
                    className="rounded-full"
                  />
                  <Heading
                    size="md"
                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                    align="center"
                  >
                    {name}
                  </Heading>
                </div>
              )}
            </Modal.Header>
            <Line className="my-8" />
            <div className="grid grid-cols-1 grid-rows-3 gap-5 sm:grid-cols-2">
              <Topics size="base" component="button" text="Animes" />
              <Topics size="base" component="button" text="Filmes" />
              <Topics size="base" component="button" text="Desenhos" />
              <Topics size="base" component="button" text="Sites" />
              <Topics size="base" component="button" text="Séries" />
              <Topics size="base" component="button" text="Outros" />
            </div>
            <Line className="my-8" />
            <div className="flex flex-col gap-y-5">
              <Button
                className="flex w-full justify-between py-3"
                text="Configurações"
                fill="empty"
              >
                <Settings />
              </Button>
              <Button
                className="flex w-full justify-between py-3"
                text="Sair"
                fill="empty"
              >
                <LogOut />
              </Button>
            </div>
          </Modal.Children>
        </Modal.Root>
      )}
    </>
  )
}

export default ModalBar

/* eslint-disable @next/next/no-img-element */
'use client'
import { Modal } from '@/components/Modal'
import { Dispatch, SetStateAction } from 'react'
import Heading from '../Typography/heading'
import Topics from '../topics'
import Button from '../button'
import { Home, LogOut, Settings } from 'lucide-react'
import Line from '../line'
import useConnection from '@/hooks/useConnection'
import clsx from 'clsx'
import Skeleton from '../skeleton'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'

type ModalBarProps = {
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  visibleModal: boolean
}

const ModalBar = ({ setVisibleModal, visibleModal }: ModalBarProps) => {
  const { push } = useRouter()
  const { client, isConnected, isLoading } = useConnection()

  const handlerLogout = () => {
    destroyCookie(null, 'user_session')
    push('/auth/redirect')
  }

  return (
    <>
      <Modal.Root visibleModal={visibleModal}>
        <Modal.Overlay
          visibleModal={visibleModal}
          onClick={() => setVisibleModal(false)}
        />
        <Modal.Children
          className={clsx(
            'z-20 m-8 !mt-28 max-h-[calc(90%_-_92px)] w-[380px] overflow-y-auto md:m-10',
            'rounded-md bg-grey-600 p-10 shadow-lg sm:w-[450px]',
          )}
        >
          <Modal.Header>
            {isConnected ? (
              isLoading ? (
                <Skeleton className="w-full" height={172} />
              ) : (
                client.map((client) => {
                  return (
                    <div
                      key={client.id}
                      className="flex flex-col items-center justify-between gap-y-8"
                    >
                      <img
                        alt={client.name}
                        src={client.pfp}
                        className="h-28 w-28 overflow-clip rounded-full object-cover object-center align-top"
                      />
                      <Heading
                        size="md"
                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        align="center"
                      >
                        {client.name}
                      </Heading>
                    </div>
                  )
                })
              )
            ) : (
              <nav className="flex flex-col gap-y-5">
                <Button
                  href="auth/sign-in"
                  fill="empty"
                  text="Login"
                  className="w-full"
                />
                <Button
                  href="auth/sign-up"
                  text="Registrar"
                  className="w-full"
                />
              </nav>
            )}
          </Modal.Header>
          <Line className="my-8" />
          <div className="grid grid-cols-1 grid-rows-3 gap-5 sm:grid-cols-2">
            <Topics component="button" text="Animes" />
            <Topics component="button" text="Filmes" />
            <Topics component="button" text="Desenhos" />
            <Topics component="button" text="Sites" />
            <Topics component="button" text="Séries" />
            <Topics component="button" text="Outros" />
          </div>
          {isConnected && (
            <>
              <Line className="my-8" />
              <div className="flex flex-col gap-y-5">
                <Button text="Configurações" fill="empty" isModalButton>
                  <Settings />
                </Button>
                <Button
                  href="/dashboard"
                  text="Desks"
                  fill="empty"
                  isModalButton
                >
                  <Home />
                </Button>
                <Button
                  onClick={handlerLogout}
                  text="Sair"
                  fill="empty"
                  isModalButton
                >
                  <LogOut />
                </Button>
              </div>
            </>
          )}
        </Modal.Children>
      </Modal.Root>
    </>
  )
}

export default ModalBar

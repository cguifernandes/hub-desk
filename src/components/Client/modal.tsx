/* eslint-disable @next/next/no-img-element */
'use client'
import { Modal } from '@/components/Modal'
import { Dispatch, SetStateAction } from 'react'
import Heading from '../Typography/heading'
import Topics from '@/components/Layout/topics'
import Button from '../button'
import { Home, LogOut } from 'lucide-react'
import Line from '../line'
import useConnection from '@/hooks/useConnection'
import clsx from 'clsx'
import Skeleton from '@/components/Layout/skeleton'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import useClient from '@/hooks/useClient'
import { categories } from '@/utils/constant'

type ModalBarProps = {
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  visibleModal: boolean
}

const ModalBar = ({ setVisibleModal, visibleModal }: ModalBarProps) => {
  const { push } = useRouter()
  const { client, isLoading } = useConnection()
  const { isConnected } = useClient()

  const handlerLogout = () => {
    destroyCookie(null, 'user_session')
    push('/auth/redirect?m=A saída foi um sucesso!')
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
            'rounded-md bg-grey-600 p-8 shadow-lg sm:w-[450px]',
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
                      key={client.pfp}
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
                  href="/auth/sign-in"
                  fill="empty"
                  text="Login"
                  className="w-full"
                />
                <Button
                  href="/auth/sign-up"
                  text="Registrar"
                  className="w-full"
                />
              </nav>
            )}
          </Modal.Header>
          <Line className="my-8" />
          <div className="flex w-full grow-[1] basis-0 flex-wrap gap-6">
            {categories.map((categories) => (
              <Topics
                onClick={() => setVisibleModal(false)}
                className="min-w-[170px] flex-1"
                key={categories.name}
                href={categories.path}
                component="button"
                text={categories.name}
              />
            ))}
          </div>
          {isConnected && (
            <>
              <Line className="my-8" />
              <div className="flex flex-col gap-y-5">
                <Button
                  onClick={() => setVisibleModal(false)}
                  href="/dashboard"
                  text="Desks"
                  fill="empty"
                  isModalButton
                >
                  <Home strokeWidth={1.5} />
                </Button>
                <Button
                  onClick={handlerLogout}
                  text="Sair"
                  fill="empty"
                  isModalButton
                >
                  <LogOut strokeWidth={1.5} />
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

/* eslint-disable @next/next/no-img-element */
'use client'
import { Modal } from '@/components/Modal'
import { Dispatch, SetStateAction } from 'react'
import Heading from '../Typography/heading'
import Button from '../button'
import { ExternalLink, LogOut, Settings, UserCircle } from 'lucide-react'
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
      <Modal.Root
        className="items-start justify-end"
        visibleModal={visibleModal}
      >
        <Modal.Overlay
          visibleModal={visibleModal}
          onClick={() => setVisibleModal(false)}
        />
        <Modal.Children
          className={clsx(
            'z-20 m-8 !mt-28 max-h-[calc(90%_-_92px)] w-[380px] overflow-y-auto md:m-10',
            'rounded-md bg-modal-gradient p-8 shadow-lg sm:w-[450px]',
          )}
        >
          <Modal.Header>
            {isConnected ? (
              isLoading ? (
                <Skeleton className="w-full" height={172} />
              ) : (
                <div className="flex flex-col items-center justify-between gap-y-8">
                  <img
                    alt={client[0]?.user}
                    src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client[0]?.pfp}`}
                    className="h-36 w-36 overflow-clip rounded-full object-cover object-center align-top"
                  />
                  <Heading
                    size="md"
                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                    align="center"
                  >
                    {client[0]?.user}
                  </Heading>
                </div>
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
          <div className="my-8 h-[2px] w-full bg-grey-400" />
          <div className="flex w-full grow-[1] basis-0 flex-wrap gap-6">
            {categories.map((categories) => (
              <Button
                onClick={() => setVisibleModal(false)}
                className="min-w-[170px] flex-1"
                key={categories.name}
                href={categories.path}
                text={categories.name}
              >
                <ExternalLink strokeWidth={1.5} size={22} className="ml-2" />
              </Button>
            ))}
          </div>
          {isConnected && (
            <>
              <div className="my-8 h-[2px] w-full bg-grey-400" />
              <div className="flex flex-col gap-y-5">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full" height={50} />
                    <Skeleton className="w-full" height={50} />
                    <Skeleton className="w-full" height={50} />
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setVisibleModal(false)}
                      href={`/profile/${client[0]?.user}`}
                      text="Meu perfil"
                      fill="empty"
                      isModalButton
                    >
                      <UserCircle strokeWidth={1.5} size={22} />
                    </Button>
                    <Button
                      onClick={() => setVisibleModal(false)}
                      href="/settings/account"
                      text="Configurações"
                      fill="empty"
                      isModalButton
                    >
                      <Settings strokeWidth={1.5} size={22} />
                    </Button>
                    <Button
                      onClick={handlerLogout}
                      text="Sair"
                      fill="empty"
                      isModalButton
                    >
                      <LogOut strokeWidth={1.5} size={22} />
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </Modal.Children>
      </Modal.Root>
    </>
  )
}

export default ModalBar

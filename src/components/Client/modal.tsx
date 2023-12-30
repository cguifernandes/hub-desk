/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Modal } from '@/components/Modal'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Heading from '../Typography/heading'
import Button from '../button'
import {
  ArrowLeft,
  Check,
  LogOut,
  Mail,
  Settings,
  UserCircle,
  X,
} from 'lucide-react'
import clsx from 'clsx'
import Skeleton from '@/components/Layout/skeleton'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import useClient from '@/hooks/useClient'
import Text from '../Typography/text'
import { InviteProps } from '@/utils/type'
import { api } from '@/utils/api'
import useConnection from '@/hooks/useConnection'

const Invites = ({
  handlerModalContent,
  setVisibleModal,
}: {
  handlerModalContent: (content: JSX.Element) => void
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [invites, setInvites] = useState<InviteProps[]>()
  const [isLoading, setIsLoading] = useState(false)
  const { user_session } = useClient()

  useEffect(() => {
    const getInvites = async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get(`/invite?id=${user_session}`, {
          headers: { 'Content-Type': 'application/json' },
        })

        setInvites(data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getInvites()
  }, [])

  const formattedDate = (createdAt: Date) => {
    const time = new Date(createdAt).getTime()
    const currentDate = new Date().getTime()
    const dateDifference = currentDate - time
    const minutes = Math.floor(dateDifference / 60000)

    if (minutes > 60 * 24 * 30 * 12) {
      const years = Math.floor(minutes / (60 * 24 * 30 * 12))
      return `Convite enviado há ${years} ano${years > 1 ? 's' : ''} atrás`
    } else if (minutes > 60 * 24 * 30) {
      const months = Math.floor(minutes / (60 * 24 * 30))
      return `Convite enviado há ${months} mês${months > 1 ? 'es' : ''} atrás`
    } else if (minutes > 60 * 24) {
      const days = Math.floor(minutes / (60 * 24))
      return `Convite enviado há ${days} dia${days > 1 ? 's' : ''} atrás`
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60)
      return `Convite enviado há ${hours} hora${hours > 1 ? 's' : ''} atrás`
    } else if (minutes >= 1) {
      return `Convite enviado há ${minutes} minuto${
        minutes > 1 ? 's' : ''
      } atrás`
    } else {
      return 'Convite enviado agora'
    }
  }

  return (
    <>
      <Modal.Header>
        <button
          onClick={() =>
            handlerModalContent(
              <ClientModal
                handlerModalContent={handlerModalContent}
                setVisibleModal={setVisibleModal}
              />,
            )
          }
          className="flex items-center gap-x-2 text-white"
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
          <span>Voltar para menu principal</span>
        </button>
      </Modal.Header>
      <div className="flex flex-col gap-y-3 pt-4">
        <div className="h-[2px] w-full bg-grey-400" />
        <div className="flex max-h-[404px] w-[480px] flex-col gap-y-4 overflow-y-auto">
          {invites?.length === 0 ? (
            <div className="flex flex-col">
              <Heading>Sem convites</Heading>
              <Text className="text-sm text-white/50">
                Você não tem nenhum convite pendente.
              </Text>
            </div>
          ) : isLoading ? (
            <>
              <div className="flex w-[480px] items-center gap-x-4 px-2">
                <div className="flex w-[368px] flex-col gap-y-1">
                  <Skeleton height={24} width={240} />
                  <Skeleton height={60} className="w-full" />
                  <Skeleton height={32} width={180} />
                </div>
                <div className="flex gap-x-2 text-white">
                  <Skeleton height={36} width={36} />
                  <Skeleton height={36} width={36} />
                </div>
              </div>
              <div className="flex w-[480px] items-center gap-x-4 px-2">
                <div className="flex w-[368px] flex-col gap-y-1">
                  <Skeleton height={24} width={240} />
                  <Skeleton height={60} className="w-full" />
                  <Skeleton height={32} width={180} />
                </div>
                <div className="flex gap-x-2 text-white">
                  <Skeleton height={36} width={36} />
                  <Skeleton height={36} width={36} />
                </div>
              </div>
              <div className="flex w-[480px] items-center gap-x-4 px-2">
                <div className="flex w-[368px] flex-col gap-y-1">
                  <Skeleton height={24} width={240} />
                  <Skeleton height={60} className="w-full" />
                  <Skeleton height={32} width={180} />
                </div>
                <div className="flex gap-x-2 text-white">
                  <Skeleton height={36} width={36} />
                  <Skeleton height={36} width={36} />
                </div>
              </div>
            </>
          ) : (
            invites?.map((invite) => (
              <div key={invite.id} className="flex items-center gap-x-4 px-2">
                <div className="flex flex-col">
                  <Heading>{invite.desk?.title}</Heading>
                  <Text className="text-sm text-white/50">
                    {invite.sender?.user} te convidou para fazer parte de &#34;
                    {invite.desk?.title}&#34;, caso rejeite o convite o mesmo
                    será excluído.
                  </Text>
                  <span className="mt-2 w-fit rounded-md bg-grey-500 px-3 py-2 text-xs text-white">
                    {formattedDate(invite.createdAt)}
                  </span>
                </div>
                <div className="flex gap-x-2 text-white">
                  <button className="flex h-9 w-9 items-center justify-center rounded-md border border-grey-400 bg-desk-gradient">
                    <X size={22} strokeWidth={1.5} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-gradient">
                    <Check size={22} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

const ClientModal = ({
  setVisibleModal,
  handlerModalContent,
}: {
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  handlerModalContent: (content: JSX.Element) => void
}) => {
  const { push } = useRouter()
  const { client, isLoading } = useConnection()
  const { isConnected } = useClient()

  const handlerLogout = () => {
    destroyCookie(null, 'user_session')
    push('/auth/redirect?m=A saída foi um sucesso!')
  }

  return (
    <>
      <Modal.Header>
        {isConnected ? (
          isLoading || client[0]?.pfp === undefined ? (
            <Skeleton className="w-full" height={156} />
          ) : (
            <div className="flex flex-col items-center justify-between gap-y-4">
              <img
                alt={client[0]?.user}
                src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client[0]?.pfp}`}
                className="h-28 w-28 overflow-clip rounded-full object-cover object-center align-top"
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
            <Button href="/auth/sign-up" text="Registrar" className="w-full" />
          </nav>
        )}
      </Modal.Header>
      {isConnected && (
        <>
          <div className="my-8 h-[2px] w-full bg-grey-400" />
          <div className="flex w-full min-w-[320px] flex-col gap-y-5">
            {isLoading ? (
              <>
                <Skeleton className="w-full" height={50} />
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
                  onClick={() =>
                    handlerModalContent(
                      <Invites
                        setVisibleModal={setVisibleModal}
                        handlerModalContent={handlerModalContent}
                      />,
                    )
                  }
                  text="Convites"
                  fill="empty"
                  isModalButton
                >
                  <Mail strokeWidth={1.5} size={22} />
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
    </>
  )
}

const Navigation = ({
  setVisibleModal,
  visibleModal,
}: {
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  visibleModal: boolean
}) => {
  const handlerModalContent = (content: JSX.Element) => {
    setModalContent(content)
  }
  const [modalContent, setModalContent] = useState<JSX.Element | null>(
    <ClientModal
      handlerModalContent={handlerModalContent}
      setVisibleModal={setVisibleModal}
    />,
  )

  return (
    <>
      <Modal.Root
        className="items-start justify-end"
        visibleModal={visibleModal}
      >
        <Modal.Overlay
          visibleModal={visibleModal}
          onClick={() => {
            setVisibleModal(false)
            setModalContent(
              <ClientModal
                handlerModalContent={handlerModalContent}
                setVisibleModal={setVisibleModal}
              />,
            )
          }}
        />
        <Modal.Children
          className={clsx(
            'z-50 m-8 !mt-24 max-h-[calc(90%_-_92px)] overflow-y-auto md:m-10',
            'rounded-md bg-modal-gradient p-4 shadow-lg backdrop-blur-md',
          )}
        >
          {modalContent}
        </Modal.Children>
      </Modal.Root>
    </>
  )
}

export default Navigation

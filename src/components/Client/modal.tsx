/* eslint-disable jsx-a11y/alt-text */
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
  ExternalLink,
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
import Link from 'next/link'
import { Toast } from '@/utils/toast'
import Loading from '@/utils/utils'
import SearchWrapper from '../Wrapper/searchWrapper'

const Desks = ({
  handlerModalContent,
  setVisibleModal,
}: {
  handlerModalContent: (content: JSX.Element) => void
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [desks, setDesks] = useState<InviteProps[]>()
  const [isLoading, setIsLoading] = useState(false)
  const { user_session } = useClient()

  useEffect(() => {
    const getDesks = async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get(
          `/desks/getDesksParticipate?id=${user_session}`,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )

        setDesks(data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getDesks()
  }, [])

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
      <div className="flex max-w-[420px] flex-col gap-y-3 pt-4">
        <div className="h-[2px] w-full bg-grey-400" />
        {desks && desks.length === 0 ? (
          <div className="flex flex-col">
            <Heading>Sem nenhuma desk</Heading>
            <Text className="text-sm text-white/50">
              Por enquanto, você não participa de nenhuma desk.
            </Text>
          </div>
        ) : isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex h-[130px] max-w-full rounded-md px-3 py-2"
              >
                {index === 2 && (
                  <Skeleton className="mr-3 min-h-full min-w-[80px]" />
                )}
                <div className="flex w-[289px] flex-col justify-between gap-y-3 py-2">
                  <div className="space-y-px">
                    <Skeleton
                      style={{ width: index === 2 ? 170 : 250 }}
                      className="max-w-full"
                      height={28}
                    />
                    <Skeleton className="w-[190px] max-w-full" height={20} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Skeleton className="w-[90px] max-w-full" height={20} />
                    <Skeleton className="w-[150px] max-w-full" height={20} />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          desks?.map((desk, index) => (
            <div
              key={index}
              className="flex min-h-[130px] max-w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
            >
              {desk.desk && desk.desk.image && (
                <img
                  className="mr-3 w-20 rounded-md object-cover"
                  src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk.desk.image}`}
                  alt={desk.desk.title}
                />
              )}
              <div className="flex max-w-full flex-col justify-between gap-y-3 py-2">
                <Link
                  href={`/desk/${desk.desk?.id}`}
                  onClick={() => {
                    handlerModalContent(
                      <ClientModal
                        handlerModalContent={handlerModalContent}
                        setVisibleModal={setVisibleModal}
                      />,
                    )
                    setVisibleModal(false)
                  }}
                  className="space-y-px"
                >
                  <div className="flex items-center break-all">
                    <Heading className="line-clamp-1 text-lg">
                      {desk?.desk?.title}{' '}
                      <span className="text-sm text-white/50">
                        ({desk.desk?.visibility})
                      </span>
                    </Heading>
                  </div>
                  <Text
                    size="sm"
                    className="line-clamp-2 break-words text-white/50"
                  >
                    {desk.desk?.description}
                  </Text>
                </Link>
                <SearchWrapper
                  author={desk.desk?.author}
                  createdAt={desk?.desk?.createdAt}
                  comments={desk?.desk?._count?.comments}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

const AcceptInvite = ({
  setVisibleModal,
  invite,
  handlerModalContent,
}: {
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  invite: InviteProps
  handlerModalContent: (content: JSX.Element) => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const handlerAcceptInvite = async (deskId: string | undefined) => {
    try {
      setIsLoading(true)

      const { data } = await api.post(
        `/invite/accept?deskId=${deskId}&id=${invite.receiver?.id}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
      setVisibleModal(false)
      handlerModalContent(
        <ClientModal
          handlerModalContent={handlerModalContent}
          setVisibleModal={setVisibleModal}
        />,
      )
      push(`/desk/${deskId}`)
    }
  }

  return (
    <button
      onClick={() => handlerAcceptInvite(invite.desk?.id)}
      className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-gradient"
    >
      {isLoading ? (
        <Loading className="h-5 w-5" />
      ) : (
        <Check size={22} strokeWidth={1.5} />
      )}
    </button>
  )
}

const DeclineInvite = ({
  invite,
  setInvites,
  handlerModalContent,
  setVisibleModal,
}: {
  invite: InviteProps
  setInvites: Dispatch<SetStateAction<InviteProps[] | undefined>>
  handlerModalContent: (content: JSX.Element) => void
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlerDeleteInvite = async (deskId: string | undefined) => {
    try {
      setIsLoading(true)

      const { data } = await api.delete(
        `/invite?deskId=${deskId}&id=${invite.receiver?.id}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setInvites(data.updateInvites)
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
      setVisibleModal(false)
      handlerModalContent(
        <ClientModal
          handlerModalContent={handlerModalContent}
          setVisibleModal={setVisibleModal}
        />,
      )
    }
  }

  return (
    <button
      onClick={() => handlerDeleteInvite(invite.desk?.id)}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-grey-400 bg-desk-gradient"
    >
      {isLoading ? (
        <Loading className="h-5 w-5" />
      ) : (
        <X size={22} strokeWidth={1.5} />
      )}
    </button>
  )
}

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
      return `Convite enviado há ${years} ano${years > 1 ? 's' : ''}`
    } else if (minutes > 60 * 24 * 30) {
      const months = Math.floor(minutes / (60 * 24 * 30))
      return `Convite enviado há ${months} mês${months > 1 ? 'es' : ''}`
    } else if (minutes > 60 * 24) {
      const days = Math.floor(minutes / (60 * 24))
      return `Convite enviado há ${days} dia${days > 1 ? 's' : ''}`
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60)
      return `Convite enviado há ${hours} hora${hours > 1 ? 's' : ''}`
    } else if (minutes >= 1) {
      return `Convite enviado há ${minutes} minuto${minutes > 1 ? 's' : ''}`
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
        <div className="flex max-h-[404px] max-w-[480px] flex-col gap-y-4 overflow-y-auto">
          {invites?.length === 0 ? (
            <div className="flex flex-col">
              <Heading>Sem convites</Heading>
              <Text className="text-sm text-white/50">
                Você não tem nenhum convite pendente.
              </Text>
            </div>
          ) : isLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex max-w-[480px] items-center gap-x-4 px-3 ${
                    index > 0 ? 'mt-4' : ''
                  }`}
                >
                  <div className="flex w-[360px] flex-col gap-y-1 space-y-3">
                    <div className="space-y-px">
                      <Skeleton height={24} className="w-full max-w-[240px]" />
                      <Skeleton
                        height={index !== 1 ? 30 : 60}
                        className="w-full"
                      />
                    </div>
                    <Skeleton height={32} width={180} />
                  </div>
                  <div className="flex flex-col gap-2 text-white sm:flex-row">
                    <Skeleton height={36} width={36} />
                    <Skeleton height={36} width={36} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            invites?.map((invite) => (
              <div
                key={invite.id}
                className="flex max-w-[480px] items-center justify-between gap-x-4 px-3 sm:flex-row"
              >
                <div className="flex w-full max-w-[360px] flex-col space-y-3">
                  <div className="space-y-px">
                    <Link
                      className="truncate text-lg text-white"
                      href={`/desk/${invite.desk?.id}`}
                    >
                      {invite.desk?.title}
                    </Link>
                    <Text className="break-words text-sm text-white/50">
                      <span className="inline-flex items-baseline gap-x-1 text-white">
                        <img
                          className="my-auto h-4 w-4 overflow-clip rounded-full object-cover object-center align-top"
                          src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${invite.sender?.pfp}`}
                        />
                        {invite.sender?.user}
                      </span>
                      &nbsp;te convidou para fazer parte de &#34;
                      <span className="text-white">{invite.desk?.title}</span>
                      &#34;, caso rejeite o convite o mesmo será excluído.
                    </Text>
                  </div>
                  <span className="w-fit rounded-md bg-grey-500 px-3 py-2 text-xs text-white">
                    {formattedDate(invite.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-white sm:flex-row">
                  <DeclineInvite
                    setVisibleModal={setVisibleModal}
                    handlerModalContent={handlerModalContent}
                    invite={invite}
                    setInvites={setInvites}
                  />
                  <AcceptInvite
                    handlerModalContent={handlerModalContent}
                    invite={invite}
                    setVisibleModal={setVisibleModal}
                  />
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

  const handlerLogout = async () => {
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
          <div className="max-w-sm space-y-4">
            <div className="flex flex-col">
              <Heading size="md">Crie uma desk</Heading>
              <Text className="text-sm text-white/50">
                Discuta opiniões com uma comunidade gigante, o Hub Desk.
              </Text>
            </div>
            <Button
              href="/desk/post"
              text="Criar uma desk"
              className="flex w-full items-center justify-between"
            >
              <ExternalLink strokeWidth={1.5} size={22} className="ml-2" />
            </Button>
          </div>
        )}
      </Modal.Header>
      {isConnected ? (
        <>
          <div className="my-4 h-[2px] w-full bg-grey-400" />
          <div className="flex w-full min-w-[320px] flex-col gap-y-5">
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-full" height={50} />
                ))}
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
                      <Desks
                        handlerModalContent={handlerModalContent}
                        setVisibleModal={setVisibleModal}
                      />,
                    )
                  }
                  text="Desks em que participo"
                  fill="empty"
                  isModalButton
                />
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
      ) : (
        <>
          <div className="my-6 h-[2px] w-full bg-grey-400" />
          <div className="max-w-sm space-y-4">
            <div className="flex flex-col">
              <Heading size="md">Ainda não tem uma conta?</Heading>
              <Text className="text-sm text-white/50">
                Não deixe essa oportunidade escapar, crie sua conta agora e
                comece a aproveitar!
              </Text>
            </div>
            <nav className="flex flex-col gap-y-3">
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
            'z-50 m-8 !mt-24 max-h-[calc(75%_-_92px)] overflow-y-auto md:m-10',
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

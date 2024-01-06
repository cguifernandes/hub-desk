/* eslint-disable camelcase */
'use client'
import { LogOut, Pencil, Settings, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'
import DeleteModal from './Modal/DeleteAccount/deleteAccount'
import Link from 'next/link'

type DeskSettingsProps = {
  isLeader: boolean
  image?: string
  deskId?: string | undefined
  user_session: string
  isCoLeader: boolean
  isMember: boolean
}

const LeaveDesk = ({
  deskId,
  user_session,
}: {
  deskId?: string | undefined
  user_session: string
}) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const handlerLeaveDesk = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/members/leave?id=${user_session}&deskId=${deskId}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setVisibleModal(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setVisibleModal(true)}
        className="flex justify-between rounded-b-md p-3 transition-colors hover:bg-grey-600"
      >
        <span className="text-white">Sair da desk</span>
        <LogOut size={22} strokeWidth={1.5} color="#fff" />
      </button>
      <DeleteModal
        loading={isLoading}
        handlerDeleteAccount={handlerLeaveDesk}
        setVisibleModal={setVisibleModal}
        visibleModal={visibleModal}
        text="Tem certeza que deseja sair da desk?"
        subtitle="Ao clicar no botão 'Confirmar', você não fará mais parte da desk, logo, terá que ser convidado novamente caso deseje participar outra vez"
      />
    </>
  )
}

const DeskSettings = ({
  isLeader,
  deskId,
  image,
  isCoLeader,
  user_session,
  isMember,
}: DeskSettingsProps) => {
  const [visibleSettings, setVisibleSettings] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const handlerDeleteAccount = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/desks?deskId=${deskId}&image=${image === '' && undefined}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      push('/')
      setVisibleModal(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setVisibleSettings(!visibleSettings)}
        className="z-20 flex items-center justify-center rounded-full bg-grey-600 p-3"
      >
        <Settings size={22} strokeWidth={1.5} color="#fff" />
      </button>
      <AnimatePresence>
        {visibleSettings && (
          <>
            <div
              className="fixed left-0 top-0 z-20 h-screen w-screen"
              onClick={() => setVisibleSettings(false)}
            />
            <motion.div
              initial={{ translateY: -10, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'keyframes', duration: 0.2 }}
              className="absolute right-[18px] top-[75px] z-20 flex w-64 flex-col rounded-md border border-grey-400 bg-grey-700"
            >
              {isLeader && (
                <>
                  <Link
                    href={`/desk/edit/${deskId}`}
                    className="flex justify-between rounded-t-md p-3 transition-colors hover:bg-grey-600"
                  >
                    <span className="text-white">Editar desk</span>
                    <Pencil size={22} strokeWidth={1.5} color="#fff" />
                  </Link>
                  <button
                    onClick={() => setVisibleModal(true)}
                    className="flex justify-between rounded-b-md p-3 transition-colors hover:bg-grey-600"
                  >
                    <span className="text-white">Excluir desk</span>
                    <Trash2 size={22} strokeWidth={1.5} color="#fff" />
                  </button>
                </>
              )}
              {isMember && isCoLeader && !isLeader && (
                <>
                  <Link
                    href={`/desk/edit/${deskId}`}
                    className="flex justify-between rounded-t-md p-3 transition-colors hover:bg-grey-600"
                  >
                    <span className="text-white">Editar desk</span>
                    <Pencil size={22} strokeWidth={1.5} color="#fff" />
                  </Link>
                  <LeaveDesk user_session={user_session} deskId={deskId} />
                </>
              )}
              {!isLeader && !isCoLeader && (
                <LeaveDesk user_session={user_session} deskId={deskId} />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <DeleteModal
        loading={isLoading}
        handlerDeleteAccount={handlerDeleteAccount}
        setVisibleModal={setVisibleModal}
        visibleModal={visibleModal}
        text="Tem certeza que deseja deletar essa desk?"
        subtitle="Ao clicar no botão &#34;Confirmar&#34; essa desk será apagada e você não poderá recuperá-la"
      />
    </>
  )
}

export default DeskSettings

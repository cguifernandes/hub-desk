'use client'
import { Pencil, Settings, Trash2 } from 'lucide-react'
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
}

const DeskSettings = ({ isLeader, deskId, image }: DeskSettingsProps) => {
  const [visibleSettings, setVisibleSettings] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const handlerDeleteAccount = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/desks?deskId=${deskId}&image=${image}`,
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

  if (!isLeader) return <></>

  return (
    <>
      <button
        onClick={() => setVisibleSettings(!visibleSettings)}
        className="absolute right-2 top-2 z-20 rounded-full bg-grey-600 p-3"
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
              className="absolute right-3 top-[60px] z-20 flex w-64 flex-col rounded-md border border-grey-400 bg-grey-700"
            >
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

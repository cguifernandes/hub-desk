import { AnimatePresence, motion } from 'framer-motion'
import { Check, MoreVertical } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import Text from './Typography/text'
import Button from './button'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'

const EditRole = ({
  role,
  deskId,
  userId,
  setVisibleModal,
  setUpdateMembers,
}: {
  role: 'Líder' | 'Co-líder' | 'Membro'
  deskId: string | undefined
  userId: string
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  setUpdateMembers: Dispatch<SetStateAction<boolean>>
}) => {
  const [checkCoLeader, setCheckCoLeader] = useState(role === 'Co-líder')
  const [checkMember, setCheckMember] = useState(role === 'Membro')
  const [isLoading, setIsLoading] = useState(false)
  const [newRole, setNewRole] = useState<'Líder' | 'Co-líder' | 'Membro'>(role)

  const handlerEditRole = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.put(
        `/members?id=${userId}`,
        { deskId, role: newRole },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setUpdateMembers(true)
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
      <div className="flex w-full items-center justify-between rounded-b-md p-3 text-white transition-colors hover:bg-grey-600">
        <span>Co-líder</span>
        <label
          htmlFor="roleCoLeader"
          className="relative left-0 flex cursor-pointer items-center"
        >
          <input
            type="radio"
            id="roleCoLeader"
            name="role"
            value="Co-líder"
            className="h-6 w-6 appearance-none rounded-sm bg-white"
            checked={checkCoLeader}
            onChange={(e) => {
              setCheckCoLeader(!checkCoLeader)
              setCheckMember(checkCoLeader)
              setNewRole(e.target.value as 'Líder' | 'Co-líder' | 'Membro')
              e.target.checked = checkCoLeader
            }}
          />
          <Check
            size={20}
            color="#075985"
            style={{ opacity: checkCoLeader ? 1 : 0 }}
            className="absolute left-[2px] transition-opacity"
          />
        </label>
      </div>
      <div className="flex w-full items-center justify-between rounded-b-md p-3 text-white transition-colors hover:bg-grey-600">
        <span>Membro</span>
        <label
          htmlFor="roleMember"
          className="relative left-0 flex cursor-pointer items-center"
        >
          <input
            type="radio"
            id="roleMember"
            name="role"
            value="Membro"
            className="h-6 w-6 appearance-none rounded-sm bg-white"
            checked={checkMember}
            onChange={(e) => {
              setCheckMember(!checkMember)
              setCheckCoLeader(checkMember)
              setNewRole(e.target.value as 'Líder' | 'Co-líder' | 'Membro')
              e.target.checked = checkMember
            }}
          />
          <Check
            size={20}
            color="#075985"
            style={{ opacity: checkMember ? 1 : 0 }}
            className="absolute left-[2px] transition-opacity"
          />
        </label>
      </div>
      <div className="p-3">
        <Text className="text-sm">
          Líder:{' '}
          <span className="text-white/50">
            Pode excluir a desk, editar a desk, comentar, apagar comentários,
            remover membros e editar cargos. (Somente o criador da desk pode ser
            designado como líder, não sendo possível atribuir esse papel a
            outros membros.)
          </span>
        </Text>
        <Text className="text-sm">
          Co-líder:{' '}
          <span className="text-white/50">
            Pode comentar na desk, editar desk e apagar comentários.
          </span>
        </Text>
        <Text className="text-sm">
          Membro:{' '}
          <span className="text-white/50">Apenas pode comentar nas mesas.</span>
        </Text>
      </div>
      <Button
        loading={isLoading}
        onClick={handlerEditRole}
        text="Alterar cargo"
        className="m-3"
      />
    </>
  )
}

const Menu = ({
  setModalContent,
  role,
  deskId,
  userId,
  setVisibleModal,
  setUpdateMembers,
}: {
  setModalContent: Dispatch<SetStateAction<JSX.Element | null>>
  role: 'Líder' | 'Co-líder' | 'Membro'
  deskId: string | undefined
  userId: string
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  setUpdateMembers: Dispatch<SetStateAction<boolean>>
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlerRemoveMember = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/members?id=${userId}&deskId=${deskId}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setUpdateMembers(true)
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
        onClick={() =>
          setModalContent(
            <EditRole
              setUpdateMembers={setUpdateMembers}
              setVisibleModal={setVisibleModal}
              userId={userId}
              deskId={deskId}
              role={role}
            />,
          )
        }
        className="flex justify-between rounded-t-md p-3 transition-colors hover:bg-grey-600"
      >
        <span className="text-white">Editar cargo</span>
      </button>
      {isLoading ? (
        <svg
          aria-hidden="true"
          className="m-3 mx-auto h-8 w-8 animate-spin fill-white text-gray-200 dark:text-white/40"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <button
          onClick={handlerRemoveMember}
          className="flex justify-between rounded-b-md p-3 transition-colors hover:bg-grey-600"
        >
          <span className="text-white">Remover membro da desk</span>
        </button>
      )}
    </>
  )
}

const MemberConfig = ({
  role,
  deskId,
  userId,
  setUpdateMembers,
}: {
  role: 'Líder' | 'Co-líder' | 'Membro'
  deskId: string | undefined
  userId: string
  setUpdateMembers: Dispatch<SetStateAction<boolean>>
}) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)

  const handlerClickConfig = () => {
    setVisibleModal(true)
    setModalContent(
      <Menu
        setUpdateMembers={setUpdateMembers}
        setVisibleModal={setVisibleModal}
        userId={userId}
        deskId={deskId}
        role={role}
        setModalContent={setModalContent}
      />,
    )
  }

  return (
    <>
      <button onClick={handlerClickConfig}>
        <MoreVertical color="#fff" size={24} strokeWidth={1.5} />
      </button>
      {visibleModal && (
        <>
          <div
            className="fixed left-0 top-0 z-20 h-screen w-screen"
            onClick={() => setVisibleModal(false)}
          />
          <AnimatePresence>
            <motion.div
              initial={{ translateY: -10, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'keyframes', duration: 0.2 }}
              className="absolute right-1 top-[55px] z-20 flex w-full max-w-[390px] flex-col rounded-md border border-grey-400 bg-grey-700"
            >
              {modalContent}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  )
}

export default MemberConfig

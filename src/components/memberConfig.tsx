import { AnimatePresence, motion } from 'framer-motion'
import { Check, MoreVertical } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import Text from './Typography/text'
import Button from './button'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { MemberProps } from '@/utils/type'
import Loading from '@/utils/utils'

type EditRoleProps = {
  role: 'Líder' | 'Co-líder' | 'Membro'
  deskId: string | undefined
  userId: string
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  setMembers: Dispatch<SetStateAction<MemberProps[] | undefined>>
  page: number
}

type MenuProps = {
  setModalContent: Dispatch<SetStateAction<JSX.Element | null>>
  role: 'Líder' | 'Co-líder' | 'Membro'
  deskId: string | undefined
  userId: string
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  setMembers: Dispatch<SetStateAction<MemberProps[] | undefined>>
  setPage: Dispatch<SetStateAction<number>>
  page: number
  setCount: Dispatch<SetStateAction<number>>
}

type MemberConfigProps = {
  role: 'Líder' | 'Co-líder' | 'Membro'
  deskId: string | undefined
  userId: string
  setMembers: Dispatch<SetStateAction<MemberProps[] | undefined>>
  setPage: Dispatch<SetStateAction<number>>
  page: number
  setCount: Dispatch<SetStateAction<number>>
}

const EditRole = ({
  role,
  deskId,
  userId,
  setVisibleModal,
  setMembers,
  page,
}: EditRoleProps) => {
  const [checkCoLeader, setCheckCoLeader] = useState(role === 'Co-líder')
  const [checkMember, setCheckMember] = useState(role === 'Membro')
  const [isLoading, setIsLoading] = useState(false)
  const [newRole, setNewRole] = useState<'Líder' | 'Co-líder' | 'Membro'>(role)

  const handlerEditRole = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.put(
        `/members?id=${userId}&page=${page}`,
        { deskId, role: newRole },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setMembers(data.updatedMembers)
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
            outros membros)
          </span>
        </Text>
        <Text className="text-sm">
          Co-líder:{' '}
          <span className="text-white/50">
            Pode comentar na desk, editar desk e apagar comentários
          </span>
        </Text>
        <Text className="text-sm">
          Membro:{' '}
          <span className="text-white/50">Apenas pode comentar nas mesas</span>
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
  setMembers,
  setPage,
  setCount,
  page,
}: MenuProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlerRemoveMember = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/members?id=${userId}&deskId=${deskId}&page=${page}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setMembers(data.updatedMembers)
        setCount(data.count)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPage(1)
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
              setVisibleModal={setVisibleModal}
              userId={userId}
              deskId={deskId}
              page={page}
              setMembers={setMembers}
              role={role}
            />,
          )
        }
        className="flex justify-between rounded-t-md p-3 transition-colors hover:bg-grey-600"
      >
        <span className="text-white">Editar cargo</span>
      </button>
      {isLoading ? (
        <Loading className="m-3 mx-auto h-8 w-8" />
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
  setMembers,
  setCount,
  page,
  setPage,
}: MemberConfigProps) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)

  const handlerClickConfig = () => {
    setVisibleModal(true)
    setModalContent(
      <Menu
        setCount={setCount}
        setVisibleModal={setVisibleModal}
        userId={userId}
        deskId={deskId}
        role={role}
        setMembers={setMembers}
        setModalContent={setModalContent}
        setPage={setPage}
        page={page}
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
              className="absolute right-1 top-[55px] z-20 flex w-full max-w-[320px] flex-col rounded-md border border-grey-400 bg-grey-700"
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

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react'
import Select from '../select'
import { CheckCircle2, Search, X } from 'lucide-react'
import { ClientsProps } from '@/utils/type'
import Skeleton from '../Layout/skeleton'
import Text from '../Typography/text'
import Heading from '../Typography/heading'

type FormMultiselectProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  setUsers: Dispatch<
    SetStateAction<
      | {
          userId: string
          user: string
        }[]
      | undefined
    >
  >
  users:
    | {
        userId: string
        user: string
      }[]
    | undefined
}

const FormMultiselect = ({
  value,
  className,
  placeholder,
  setUsers,
  users,
  ...props
}: FormMultiselectProps) => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ClientsProps[]>()

  const handlerSearchUser = async (query: string) => {
    setQuery(query)

    if (query !== '') {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/search/users?q=${query}`, {
          cache: 'no-cache',
          method: 'GET',
        })

        const { clients } = await response.json()
        setResponse(clients)
      } catch (err) {
        console.error('Erro ao processar formulário:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handlerClickUser = (client: ClientsProps) => {
    const existUser = users?.find((user) => user.userId === client.id)

    if (!existUser) {
      setUsers((prev) => [
        ...(prev || []),
        { userId: client.id, user: client.user },
      ])
    }
  }

  return (
    <div className="flex flex-col">
      {value && <label className="text-sm text-white/50">{placeholder}</label>}
      <Select
        {...props}
        setQuery={setQuery}
        value={value}
        className={className}
      >
        <div className="flex max-h-[300px] flex-col items-center overflow-auto">
          <div
            className={clsx(
              'flex w-full rounded-t-md px-4 py-3 backdrop-blur-md ease-out',
              'items-center justify-between bg-grey-700/80',
            )}
          >
            <input
              onChange={(e) => handlerSearchUser(e.target.value)}
              className="flex-1 bg-transparent pr-2 text-white placeholder-white/50"
              placeholder="Pesquise aqui..."
            />
            <div className="flex items-center gap-x-3">
              <button onClick={() => setUsers(undefined)}>
                <X color="#fff" size={20} strokeWidth={1.5} />
              </button>
              <div className="h-6 w-[2px] bg-grey-400" />
              <Search color="#fff" size={20} strokeWidth={1.5} />
            </div>
          </div>
          {query !== '' ? (
            <ul className="group flex w-full flex-col">
              {isLoading ? (
                <>
                  <div className="flex h-[72px] w-full items-center gap-x-2 px-4 py-3">
                    <Skeleton isRoundedFull className="h-12 w-12" />
                    <div className="flex flex-col gap-y-1">
                      <Skeleton width={48} height={24} />
                      <Skeleton width={180} height={20} />
                    </div>
                  </div>
                  <div className="flex h-[72px] w-full items-center gap-x-2 px-4 py-3">
                    <Skeleton isRoundedFull className="h-12 w-12" />
                    <div className="flex flex-col gap-y-1">
                      <Skeleton width={48} height={24} />
                      <Skeleton width={180} height={20} />
                    </div>
                  </div>
                  <div className="flex h-[72px] w-full items-center gap-x-2 px-4 py-3">
                    <Skeleton isRoundedFull className="h-12 w-12" />
                    <div className="flex flex-col gap-y-1">
                      <Skeleton width={48} height={24} />
                      <Skeleton width={180} height={20} />
                    </div>
                  </div>
                </>
              ) : response && response.length > 0 ? (
                response?.map((client) => (
                  <li
                    key={client.id}
                    onClick={() => handlerClickUser(client)}
                    className={clsx(
                      'flex items-center gap-x-2 px-4 duration-200 ease-out hover:bg-grey-500',
                      'w-full cursor-pointer py-3 text-white group-last:rounded-b-md',
                    )}
                  >
                    <img
                      className="h-12 w-12 overflow-clip rounded-full object-cover object-center align-top"
                      src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client.pfp}`}
                      alt={client.user}
                    />
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col gap-y-1">
                        <span>{client.user}</span>
                        <span className="text-sm text-white/50">
                          Membro desde{' '}
                          {new Date(client.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {users?.find((user) => user.userId === client.id) && (
                        <CheckCircle2 size={26} strokeWidth={1.5} />
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <Text className="px-4 py-3">
                  Não há nenhuma usuário com esse nome
                </Text>
              )}
            </ul>
          ) : (
            <div className="flex w-full flex-col px-4 py-3">
              <Heading>Pesquise pelo user do convidado.</Heading>
              <Text className="text-sm text-white/50">
                Ao enviar o formulário o mesmo receberá um convite para
                participar da desk.
              </Text>
            </div>
          )}
        </div>
      </Select>
    </div>
  )
}

export default FormMultiselect

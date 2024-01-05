/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react'
import Select from '../components/select'
import { Search, X } from 'lucide-react'
import { ClientsProps } from '@/utils/type'
import Skeleton from '../components/Layout/skeleton'
import Text from '../components/Typography/text'
import Heading from '../components/Typography/heading'

type MultiselectProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  setInviteMember: Dispatch<
    SetStateAction<
      | {
          userId: string
          user: string
        }
      | undefined
    >
  >
}

const Multiselect = ({
  value,
  className,
  placeholder,
  setInviteMember,
  ...props
}: MultiselectProps) => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ClientsProps[]>()
  const [visibleDropDown, setVisibleDropDown] = useState(false)

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
    setInviteMember({ user: client.user, userId: client.id })
    setVisibleDropDown(false)
  }

  return (
    <div className="flex flex-col">
      {value && <label className="text-sm text-white/50">{placeholder}</label>}
      <Select
        {...props}
        setQuery={setQuery}
        value={value}
        className={className}
        setVisibleDropDown={setVisibleDropDown}
        visibleDropDown={visibleDropDown}
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
              <button onClick={() => setInviteMember(undefined)}>
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
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex h-[70px] w-full items-center gap-x-2 rounded-md p-3"
                    >
                      <Skeleton isRoundedFull height={40} width={40} />
                      <div className="flex flex-col gap-y-1">
                        <Skeleton height={20} width={150} />
                        <Skeleton height={16} width={50} />
                      </div>
                    </div>
                  ))}
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

export default Multiselect

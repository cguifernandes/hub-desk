/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import Skeleton from './Layout/skeleton'
import { ClientsProps } from '@/utils/type'
import clsx from 'clsx'
import { MessageSquare } from 'lucide-react'

type DeskWrapperProps = {
  authorId: string | undefined
  createdAt: Date
  className?: string
  searchDesk?: boolean
}

const DeskWrapper = ({
  authorId,
  createdAt,
  searchDesk,
  className,
}: DeskWrapperProps) => {
  const [author, setAuthor] = useState<ClientsProps>()
  const [isLoading, setIsLoading] = useState(false)
  const formattedDate = new Date(createdAt).toLocaleDateString()

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/auth/getWithId?id=${authorId}`, {
          cache: 'reload',
          method: 'GET',
        })

        const data = await response.json()

        setAuthor(data.clients[0])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getClient()
  }, [])

  if (searchDesk) {
    return (
      <div className="flex items-center gap-x-6 text-xs">
        {isLoading || author === undefined ? (
          <Skeleton width={300} height={20} />
        ) : (
          <>
            <span className="flex items-center gap-x-2 text-white">
              {author?.user}
              <img
                className="h-5 w-5 rounded-full"
                src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${author?.pfp}`}
                alt={author?.user}
              />
            </span>
            <span className="flex items-center gap-x-2 text-white">
              Fazer isso <MessageSquare strokeWidth={1.5} size={18} />
            </span>
            <span className="rounded-md text-white">{formattedDate}</span>
          </>
        )}
      </div>
    )
  }
  return (
    <div
      className={clsx(
        'flex flex-wrap justify-between gap-y-2 text-xs text-white',
        className,
      )}
    >
      {isLoading || author === undefined ? (
        <Skeleton width={95} height={16} />
      ) : (
        <span className="flex items-center gap-x-1 pr-4">
          Autor: {author?.user}{' '}
          <img
            className="h-4 w-4 overflow-clip rounded-full object-cover object-center align-top"
            alt="Foto de perfil do autor"
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${author?.pfp}`}
          />
        </span>
      )}
      <span>Criado em: {formattedDate}</span>
    </div>
  )
}

export default DeskWrapper

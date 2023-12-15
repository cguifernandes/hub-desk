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

  const formattedDate = () => {
    const time = new Date(createdAt).getTime()
    const currentDate = new Date().getTime()
    const dateDifference = currentDate - time
    const minutes = Math.floor(dateDifference / 60000)

    if (minutes > 60 * 24 * 30 * 12) {
      const years = Math.floor(minutes / (60 * 24 * 30 * 12))
      return `${years} ano${years > 1 ? 's' : ''} atrás`
    } else if (minutes > 60 * 24 * 30) {
      const months = Math.floor(minutes / (60 * 24 * 30))
      return `${months} mês${months > 1 ? 'es' : ''} atrás`
    } else if (minutes > 60 * 24) {
      const days = Math.floor(minutes / (60 * 24))
      return `${days} dia${days > 1 ? 's' : ''} atrás`
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60)
      return `${hours} hora${hours > 1 ? 's' : ''} atrás`
    } else if (minutes >= 1) {
      return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`
    } else {
      return 'Agora'
    }
  }

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/auth/getWithId?id=${authorId}`, {
          cache: 'force-cache',
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
            <span className="rounded-md text-white">{formattedDate()}</span>
          </>
        )}
      </div>
    )
  }
  return (
    <div
      className={clsx(
        'flex flex-wrap justify-between gap-2 text-xs text-white',
        className,
      )}
    >
      {isLoading || author === undefined ? (
        <Skeleton width={95} height={16} />
      ) : (
        <span className="flex items-center gap-x-1 rounded-md bg-grey-500 px-3 py-2">
          {author?.user}{' '}
          <img
            className="h-4 w-4 overflow-clip rounded-full object-cover object-center align-top"
            alt="Foto de perfil do autor"
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${author?.pfp}`}
          />
        </span>
      )}
      <span className="rounded-md bg-grey-500 px-3 py-2">
        {formattedDate()}
      </span>
    </div>
  )
}

export default DeskWrapper

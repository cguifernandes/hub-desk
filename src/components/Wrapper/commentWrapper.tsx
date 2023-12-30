/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import Skeleton from '../Layout/skeleton'
import { ClientsProps } from '@/utils/type'
import clsx from 'clsx'
import Link from 'next/link'

type CommentWrapperProps = {
  authorId: string | undefined
  createdAt: Date
  className?: string
}

const CommentWrapper = ({
  authorId,
  createdAt,
  className,
}: CommentWrapperProps) => {
  const [author, setAuthor] = useState<ClientsProps>()
  const [isLoading, setIsLoading] = useState(false)

  const formattedDate = () => {
    const time = new Date(createdAt).getTime()
    const currentDate = new Date().getTime()
    const dateDifference = currentDate - time
    const minutes = Math.floor(dateDifference / 60000)

    if (minutes > 60 * 24 * 30 * 12) {
      const years = Math.floor(minutes / (60 * 24 * 30 * 12))
      return `Publicado há ${years} ano${years > 1 ? 's' : ''} atrás`
    } else if (minutes > 60 * 24 * 30) {
      const months = Math.floor(minutes / (60 * 24 * 30))
      return `Publicado há ${months} mês${months > 1 ? 'es' : ''} atrás`
    } else if (minutes > 60 * 24) {
      const days = Math.floor(minutes / (60 * 24))
      return `Publicado há ${days} dia${days > 1 ? 's' : ''} atrás`
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60)
      return `Publicado há ${hours} hora${hours > 1 ? 's' : ''} atrás`
    } else if (minutes >= 1) {
      return `Publicado há ${minutes} minuto${minutes > 1 ? 's' : ''} atrás`
    } else {
      return 'Publicado agora'
    }
  }

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/auth/getWithId?id=${authorId}`, {
          cache: 'no-cache',
          method: 'GET',
        })

        const data = await response.json()

        setAuthor(data.data[0])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getClient()
  }, [])

  return (
    <div
      className={clsx(
        'flex flex-wrap items-end justify-between gap-2 text-xs text-white',
        className,
      )}
    >
      {isLoading || author === undefined ? (
        <Skeleton width={120} height={32} />
      ) : (
        <Link
          href={`/profile/${author.user}`}
          className="z-10 flex items-center gap-x-2 rounded-md bg-grey-500 px-3 py-2"
        >
          {author?.user}{' '}
          <img
            className="h-4 w-4 overflow-clip rounded-full object-cover object-center align-top"
            alt="Foto de perfil do autor"
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${author?.pfp}`}
          />
        </Link>
      )}
      <div className="flex flex-col items-end gap-y-1">
        <span className="rounded-md bg-grey-500 px-3 py-2">
          {formattedDate()}
        </span>
      </div>
    </div>
  )
}

export default CommentWrapper

'use client'
/* eslint-disable @next/next/no-img-element */
import Skeleton from '../Layout/skeleton'
import { ClientsProps } from '@/utils/type'
import clsx from 'clsx'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

type DeskWrapperProps = {
  author: ClientsProps | undefined
  createdAt: Date
  className?: string
  comments?: number | undefined
}

const DeskWrapper = ({
  author,
  createdAt,
  className,
  comments,
}: DeskWrapperProps) => {
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

  return (
    <div
      className={clsx(
        'flex flex-col flex-wrap items-start justify-between gap-2 text-xs text-white sm:flex-row sm:items-end',
        className,
      )}
    >
      {author === undefined ? (
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
      <div className="flex flex-col items-start gap-y-2 sm:items-end">
        {comments
          ? comments > 0 && (
              <span className="flex items-center gap-x-2 rounded-md bg-grey-500 px-3 py-2 text-white">
                {comments}
                <MessageSquare strokeWidth={1.5} size={18} />
              </span>
            )
          : undefined}
        <span className="rounded-md bg-grey-500 px-3 py-2">
          {formattedDate()}
        </span>
      </div>
    </div>
  )
}

export default DeskWrapper

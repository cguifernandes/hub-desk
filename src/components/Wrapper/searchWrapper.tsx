'use client'
/* eslint-disable @next/next/no-img-element */
import Skeleton from '../Layout/skeleton'
import { ClientsProps } from '@/utils/type'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

type SearchWrapperProps = {
  createdAt: Date | undefined
  comments?: number | undefined
  author: ClientsProps | undefined
}

const SearchWrapper = ({ createdAt, comments, author }: SearchWrapperProps) => {
  const formattedDate = () => {
    if (createdAt) {
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
  }

  return (
    <div className="flex items-center gap-x-6 text-xs">
      {author?.pfp === undefined ? (
        <Skeleton width={300} height={20} />
      ) : (
        <>
          <Link
            href={`/profile/${author?.user}`}
            className="z-10 flex items-center gap-x-2 text-white"
          >
            {author?.user}
            <img
              className="h-5 w-5 rounded-full"
              src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${author?.pfp}`}
              alt={author?.user}
            />
          </Link>
          {comments
            ? comments > 0 && (
                <span className="flex items-center gap-x-2 text-white">
                  {comments}
                  <MessageSquare strokeWidth={1.5} size={18} />
                </span>
              )
            : undefined}
          <span className="rounded-md text-white">{formattedDate()}</span>
        </>
      )}
    </div>
  )
}

export default SearchWrapper

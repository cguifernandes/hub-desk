/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import Skeleton from './Layout/skeleton'
import { ClientsProps } from '@/utils/type'
import clsx from 'clsx'

type DeskWrapperProps = {
  authorId: string | undefined
  createdAt: Date
  className?: string
}

const DeskWrapper = ({ authorId, createdAt, className }: DeskWrapperProps) => {
  const [author, setAuthor] = useState<ClientsProps>()
  const [isLoading, setIsLoading] = useState(false)
  const formattedDate = new Date(createdAt).toLocaleDateString()

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/auth?id=${authorId}`, {
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

  return (
    <div
      className={clsx(
        'flex flex-wrap justify-between gap-y-2 text-xs text-white',
        className,
      )}
    >
      {isLoading ? (
        <Skeleton width={95} height={16} />
      ) : (
        <span className="flex items-center gap-x-1 pr-4">
          Autor: {author?.name}{' '}
          <img
            className="h-4 w-4 overflow-clip rounded-full object-cover object-center align-top"
            alt="Foto de perfil do autor"
            src={author?.pfp}
          />
        </span>
      )}

      <span>Criado em: {formattedDate}</span>
    </div>
  )
}

export default DeskWrapper

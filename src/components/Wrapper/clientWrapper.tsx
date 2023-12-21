/* eslint-disable react-hooks/exhaustive-deps */
import { url } from '@/utils/constant'
import { RDeskProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import Skeleton from '../Layout/skeleton'

type ClientWrapperProps = {
  createdAt: Date
  authorId: string
}

const ClientWrapper = ({ createdAt, authorId }: ClientWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)
  const formattedDate = new Date(createdAt).toLocaleDateString()

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const desksResponse = await fetch(
          `${url}/api/desks/getWithAuthorId?id=${authorId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-cache',
          },
        )

        const desks: RDeskProps = await desksResponse.json()

        setCount(desks.count)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getClient()
  }, [])

  return (
    <div className="flex items-center gap-x-6 text-xs">
      {isLoading ? (
        <Skeleton width={182} height={20} />
      ) : (
        <>
          <span className="flex items-center gap-x-2 text-white/50">
            {count} Desks criadas
          </span>
          <span className="text-white/50">Membro desde: {formattedDate}</span>
        </>
      )}
    </div>
  )
}

export default ClientWrapper

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
'use client'
import CardDesk from '../cardDesk'
import clsx from 'clsx'
import Skeleton from '@/components/Layout/skeleton'
import Pagination from '@/components/Layout/pagination'
import EmptyAlert from '@/components/Layout/emptyAlert'
import { useEffect, useState } from 'react'
import { DeskProps, RDeskProps } from '@/utils/type'
import Heading from '../Typography/heading'
import Text from '../Typography/text'

const Desks = ({
  id,
  user,
  deskCount,
}: {
  id: string
  user: string
  deskCount: number
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [desks, setDesks] = useState<DeskProps[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(count / 8)

  useEffect(() => {
    const getDesks = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/desks/getMany?id=${id}&page=${page}`,
          {
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
          },
        )
        const { data, count } = (await response.json()) as RDeskProps

        setDesks(data)
        setCount(count)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getDesks()
  }, [page])

  return (
    <>
      {deskCount === 0 ? (
        <EmptyAlert
          submessage={`Por enquanto, ${user} não possui nenhuma desk`}
          message="Este perfil não tem nenhuma desk cadastrada"
        />
      ) : (
        <>
          <div className="w-full text-center">
            <Heading size="lg">Desks</Heading>
            <Text className="text-white/50">Desks criadas por {user}</Text>
          </div>
          <div
            className={clsx(
              'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 px-4 py-10 md:p-10',
            )}
          >
            {isLoading ? (
              <>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative flex h-[640px] min-w-[360px] max-w-[490px] flex-1 flex-col justify-between rounded-md border-2 border-grey-400 bg-desk-gradient p-7 shadow-md sm:min-w-[420px]"
                  >
                    <div className="flex w-full flex-col items-center space-y-1">
                      <Skeleton className="w-full" height={28} />
                      <Skeleton width={60} height={24} />
                    </div>
                    <Skeleton className="w-full" height={64} />
                    <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                      <Skeleton width={120} height={32} />
                      <Skeleton width={210} height={32} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              desks.map((desk) => (
                <CardDesk
                  className="relative min-w-[360px] max-w-[490px] flex-1 sm:min-w-[420px]"
                  href={`/desk/${desk.id}`}
                  key={desk.id}
                  data={desk}
                  comments={desk._count.comments}
                />
              ))
            )}
          </div>
        </>
      )}
      <Pagination
        className="px-4 md:px-10"
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default Desks

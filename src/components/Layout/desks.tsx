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

const Desks = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [desks, setDesks] = useState<DeskProps[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(count / 8)

  useEffect(() => {
    setMounted(true)
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

  if (!mounted) {
    return (
      <div
        className={clsx(
          'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 px-4 py-10 md:p-10',
        )}
      >
        {' '}
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
        <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
      </div>
    )
  }

  return (
    <>
      {desks.length === 0 && !isLoading ? (
        <EmptyAlert message="Não há nenhuma desk ainda" />
      ) : (
        <div
          className={clsx(
            'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 px-4 py-10 md:p-10',
          )}
        >
          {isLoading ? (
            <>
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
              <Skeleton className="h-[590px] min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]" />
            </>
          ) : (
            desks.map((desk) => (
              <CardDesk
                className="relative min-w-[360px] max-w-[490px] flex-1 sm:min-w-[420px]"
                href={`/desk/${desk.id}`}
                key={desk.id}
                data={desk}
              />
            ))
          )}
        </div>
      )}
      {desks.length > 0 && !isLoading && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  )
}

export default Desks

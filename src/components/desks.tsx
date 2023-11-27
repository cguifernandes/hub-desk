/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
'use client'
import CardDesk from './cardDesk'
import clsx from 'clsx'
import Heading from './Typography/heading'
import Skeleton from '@/components/Layout/skeleton'
import Pagination from '@/components/Layout/pagination'
import EmptyAlert from '@/components/Layout/emptyAlert'
import useClient from '@/hooks/useClient'
import { MouseEvent, useEffect, useState } from 'react'
import { DeskProps, RDeskProps, ResponseProps } from '@/utils/type'
import { api } from '@/utils/api'
import { ErrorToast } from '@/utils/toast'
import { Trash2 } from 'lucide-react'

const Desks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [desks, setDesks] = useState<DeskProps[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const { user_session } = useClient()
  const totalPages = Math.ceil(count / 12)

  // const handleDeleteDesk = async (
  //   event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  //   id: string | undefined,
  //   authorId: string | undefined,
  // ) => {
  //   event.preventDefault()
  //   try {
  //     const { data }: { data: ResponseProps } = await api.delete(
  //       `desks?page=${page}`,
  //       {
  //         data: JSON.stringify({ id, authorId }),
  //         headers: { 'Content-Type': 'application/json' },
  //       },
  //     )

  //     if (data.error) {
  //       ErrorToast(data.error)
  //     } else {
  //       setDesks(data.data)
  //       setPage(0)
  //     }
  //   } catch (err) {
  //     ErrorToast(`Erro ao apagar a desk. ${err}`)
  //   }
  // }

  useEffect(() => {
    setMounted(true)
    const getDesks = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/desks/getMany?id=${user_session}&page=${page}`,
          {
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
          },
        )
        const data = (await response.json()) as RDeskProps

        setDesks(data.data)
        setCount(data.count)
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
        <Skeleton className="h-[590px] max-w-[490px] flex-1" />
        <Skeleton className="h-[590px] max-w-[490px] flex-1" />
        <Skeleton className="h-[590px] max-w-[490px] flex-1" />
        <Skeleton className="h-[590px] max-w-[490px] flex-1" />
        <Skeleton className="h-[590px] max-w-[490px] flex-1" />
        <Skeleton className="h-[590px] max-w-[490px] flex-1" />
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
            </>
          ) : (
            desks.map((desk) => (
              <CardDesk
                className="relative min-w-[330px] max-w-[490px] flex-1 sm:min-w-[380px]"
                href={`/desk/${desk.id}`}
                key={desk.id}
                data={desk}
              />
            ))
          )}
        </div>
      )}
      {desks.length > 0 && !isLoading && (
        <Pagination setPage={setPage} totalPages={totalPages} />
      )}
    </>
  )
}

export default Desks

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
'use client'
import CardDesk from './cardDesk'
import clsx from 'clsx'
import Heading from '../../Typography/heading'
import Skeleton from '@/components/Layout/skeleton'
import Pagination from '@/components/Layout/pagination'
import EmptyAlert from '@/components/Layout/emptyAlert'
import useClient from '@/hooks/useClient'
import { MouseEvent, useEffect, useState } from 'react'
import { RDeskProps, ResponseProps } from '@/utils/type'
import { api } from '@/utils/api'
import useConnection from '@/hooks/useConnection'
import { ErrorToast } from '@/utils/toast'
import { Trash2 } from 'lucide-react'

const Desks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [desks, setDesks] = useState<RDeskProps[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const { user_session } = useClient()
  const { name } = useConnection()

  const ITEMS_PER_PAGE = 12
  const totalPages = Math.ceil(desks.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedDesks = desks.slice(startIndex, endIndex)

  const handleDeleteDesk = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string | undefined,
    authorId: string | undefined,
  ) => {
    event.preventDefault()
    try {
      const { data }: { data: ResponseProps } = await api.delete('desks', {
        data: JSON.stringify({ id, authorId }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (data.error) {
        ErrorToast(data.error)
      } else {
        const sortedDesks = data.data
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )

        setDesks(sortedDesks)
      }
    } catch (err) {
      ErrorToast(`Erro ao apagar a desk. ${err}`)
    }
  }

  useEffect(() => {
    const getDesks = async () => {
      try {
        setIsLoading(true)
        const { data }: { data: ResponseProps } = await api.get(
          `/desks/getMany?id=${user_session}`,
        )

        const sortedDesks = data.data
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )

        setDesks(sortedDesks)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getDesks()
  }, [])

  return (
    <>
      <div
        id="desk"
        className="flex items-center justify-center px-10 pt-8 sm:pt-14"
      >
        <Heading size="lg" align="center" className="text-white">
          Bem-vindo(a) às suas Desks
        </Heading>
      </div>
      {paginatedDesks.length === 0 && !isLoading ? (
        <EmptyAlert message="Você não tem nenhuma Desk" />
      ) : (
        <div
          className={clsx(
            'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 p-10',
          )}
        >
          {isLoading ? (
            <>
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
            </>
          ) : (
            paginatedDesks.map((desk) => (
              <CardDesk
                className="relative flex-1 md:w-[80%] xl:w-[390px] 2xl:w-[355px]"
                href={`/desk/${desk.id}`}
                key={desk.description}
                authorId={desk.authorId}
                category={desk.category}
                createdAt={desk.createdAt}
                description={desk.description}
                repo={desk.repo}
                title={desk.title}
                website={desk.website}
                name={name}
              >
                <button
                  onClick={(event) =>
                    handleDeleteDesk(event, desk.id, desk.authorId)
                  }
                  className="absolute right-4 top-4 z-40 rounded-xl p-2 transition-colors hover:bg-grey-400"
                >
                  <Trash2 color="#fff" strokeWidth={1.5} />
                </button>
              </CardDesk>
            ))
          )}
        </div>
      )}
      {paginatedDesks.length > 0 && !isLoading && (
        <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} />
      )}
    </>
  )
}

export default Desks

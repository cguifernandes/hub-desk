/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { ClientsProps, CommentProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import DeskWrapper from '../Wrapper/deskWrapper'
import Text from '../Typography/text'
import Pagination from './pagination'
import clsx from 'clsx'
import Skeleton from './skeleton'
import FormComments from '../Form/Comments/formComments'

type CommentsProps = {
  deskId: string | undefined
  user_session: string | undefined
  isConnected: boolean
  user: ClientsProps[]
}

const Comments = ({
  deskId,
  user_session,
  isConnected,
  user,
}: CommentsProps) => {
  const [comments, setComments] = useState<CommentProps[]>([])
  const [count, setCount] = useState(0)
  const [commentsUpdated, setCommentsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(count / 4)

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/comments/getUnique?id=${deskId}&page=${page}`,
          {
            cache: 'no-store',
          },
        )
        const data = await response.json()

        setComments(data.comments)
        setCount(data.count)
        setCommentsUpdated(false)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getComments()
  }, [page, commentsUpdated])

  return (
    <>
      {comments.length > 0 && (
        <div className="flex w-full flex-col gap-y-4 py-4 md:mx-auto md:w-11/12">
          <div className="flex w-full grow-[1] basis-0 flex-wrap justify-center gap-4">
            {!isLoading ? (
              comments.map((comments) => (
                <div
                  className={clsx(
                    'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                    'justify-between border-2 border-grey-400 bg-desk-gradient p-4 text-white',
                  )}
                  key={comments.id}
                >
                  <Text className="break-words">{comments.text}</Text>
                  <DeskWrapper
                    className="pt-8"
                    authorId={comments.authorId}
                    createdAt={comments.createdAt}
                  />
                </div>
              ))
            ) : (
              <>
                <div
                  className={clsx(
                    'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                    'justify-between border-2 border-grey-400 bg-desk-gradient p-4',
                  )}
                >
                  <Skeleton height={24} className="w-3/4" />
                  <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                    <Skeleton width={120} height={32} />
                    <Skeleton width={210} height={32} />
                  </div>
                </div>
                <div
                  className={clsx(
                    'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                    'justify-between border-2 border-grey-400 bg-desk-gradient p-4',
                  )}
                >
                  <Skeleton height={24} className="w-3/4" />
                  <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                    <Skeleton width={120} height={32} />
                    <Skeleton width={210} height={32} />
                  </div>
                </div>
                <div
                  className={clsx(
                    'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                    'justify-between border-2 border-grey-400 bg-desk-gradient p-4',
                  )}
                >
                  <Skeleton height={24} className="w-3/4" />
                  <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                    <Skeleton width={120} height={32} />
                    <Skeleton width={210} height={32} />
                  </div>
                </div>
                <div
                  className={clsx(
                    'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                    'justify-between border-2 border-grey-400 bg-desk-gradient p-4',
                  )}
                >
                  <Skeleton height={24} className="w-3/4" />
                  <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                    <Skeleton width={120} height={32} />
                    <Skeleton width={210} height={32} />
                  </div>
                </div>
              </>
            )}
          </div>
          <Pagination
            page={page}
            className="w-full"
            size="sm"
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      )}
      <FormComments
        setCommentsUpdated={setCommentsUpdated}
        deskId={deskId}
        isConnected={isConnected}
        user_session={user_session}
        user={user}
      />
    </>
  )
}

export default Comments

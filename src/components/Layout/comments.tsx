/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { CommentProps } from '@/utils/type'
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
}

const Comments = ({ deskId, user_session, isConnected }: CommentsProps) => {
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
        <div className="mx-auto flex w-11/12 flex-col gap-y-4 py-4">
          <div className="grid w-full grid-cols-2 items-center justify-items-center gap-4">
            {!isLoading ? (
              comments.map((comments) => (
                <div
                  className={clsx(
                    'flex min-h-[180px] w-full min-w-[500px] flex-col justify-between rounded-md',
                    'border-2 border-grey-400 bg-desk-gradient p-4 text-white',
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
                <Skeleton className="h-44 min-h-[180px] w-full min-w-[500px]" />
                <Skeleton className="h-44 min-h-[180px] w-full min-w-[500px]" />
                <Skeleton className="h-44 min-h-[180px] w-full min-w-[500px]" />
                <Skeleton className="h-44 min-h-[180px] w-full min-w-[500px]" />
              </>
            )}
          </div>
          <Pagination
            page={page}
            className="w-full"
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
      />
    </>
  )
}

export default Comments

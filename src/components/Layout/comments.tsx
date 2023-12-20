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

const Comments = ({ deskId }: { deskId: string | undefined }) => {
  const [comments, setComments] = useState<CommentProps[]>([])
  const [count, setCount] = useState(0)
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
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getComments()
  }, [page])

  return (
    <>
      {comments.length > 0 && (
        <>
          <div className="m-auto h-[2px] w-full max-w-[700px] bg-grey-400" />
          <div className="grid w-full grid-cols-2 items-center justify-items-center gap-4 py-4">
            {!isLoading ? (
              comments.map((comments) => (
                <div
                  className={clsx(
                    'flex h-40 w-full max-w-2xl flex-col justify-between rounded-md',
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
                <Skeleton className="h-40 w-full max-w-2xl" />
                <Skeleton className="h-40 w-full max-w-2xl" />
                <Skeleton className="h-40 w-full max-w-2xl" />
                <Skeleton className="h-40 w-full max-w-2xl" />
              </>
            )}
          </div>
          <Pagination
            page={page}
            className="w-full"
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  )
}

export default Comments

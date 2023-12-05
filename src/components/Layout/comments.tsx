/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { CommentProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import DeskWrapper from '../deskWrapper'
import Text from '../Typography/text'
import Pagination from './pagination'

const Comments = ({ deskId }: { deskId: string | undefined }) => {
  const [comments, setComments] = useState<CommentProps[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(count / 2)

  useEffect(() => {
    const getComments = async () => {
      try {
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
      }
    }

    getComments()
  }, [page])

  return (
    <>
      {comments.length > 0 && (
        <>
          <div className="m-auto h-[2px] w-full max-w-[700px] bg-grey-400" />
          <div className="flex w-full flex-col items-center justify-center space-y-4 py-4">
            {comments.map((comments) => (
              <div
                className="flex h-auto min-h-[180px] w-full max-w-[600px] flex-col justify-between rounded-md bg-grey-550 p-4 text-white shadow-md"
                key={comments.id}
              >
                <Text className="break-words">{comments.text}</Text>
                <DeskWrapper
                  className="pt-8"
                  authorId={comments.authorId}
                  createdAt={comments.createdAt}
                />
              </div>
            ))}
          </div>
          <Pagination
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

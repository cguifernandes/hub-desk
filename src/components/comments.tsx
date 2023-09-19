/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { CommentProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import DeskWrapper from './deskWrapper'
import Line from './line'
import Text from './Typography/text'
import Pagination from './Layout/pagination'

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
          <Line className="m-auto max-w-[700px]" />
          <div className="flex w-full flex-col items-center justify-center space-y-4 py-4">
            {comments.map((comments) => (
              <div
                className="bg-grey-525 flex h-auto min-h-[180px] w-full max-w-[600px] flex-col justify-between rounded-md p-4 text-white shadow-md"
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

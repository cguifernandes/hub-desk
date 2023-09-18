/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { CommentProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import DeskWrapper from './deskWrapper'
import Line from './line'

const Comments = ({ deskId }: { deskId: string | undefined }) => {
  const [comments, setComments] = useState<CommentProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/comments/getUnique?id=${deskId}`)
        const { comments } = await response.json()

        setComments(comments)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getComments()
  }, [])

  return (
    <>
      <Line className="m-auto !w-[700px]" />
      <div className="flex w-full flex-col items-center justify-center space-y-4 py-4">
        {comments.map((comments) => (
          <div
            className="flex h-40 w-[600px] flex-col justify-between bg-grey-400/30 p-4 text-white shadow-md"
            key={comments.id}
          >
            <p>{comments.text}</p>
            <DeskWrapper
              authorId={comments.authorId}
              createdAt={comments.createdAt}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Comments

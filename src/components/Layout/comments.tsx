/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { ClientsProps, CommentProps } from '@/utils/type'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Text from '../Typography/text'
import Pagination from './pagination'
import clsx from 'clsx'
import Skeleton from './skeleton'
import FormComments from '../Form/Comments/formComments'
import AnimationWrapper from '../Wrapper/animationWrapper'
import CommentWrapper from '../Wrapper/commentWrapper'
import { Trash2 } from 'lucide-react'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import Loading from '@/utils/utils'

type CommentsProps = {
  deskId: string | undefined
  user_session: string | undefined
  isConnected: boolean
  user: ClientsProps[]
  isLeader: boolean
  isCoLeader: boolean
}

const DeleteComment = ({
  deskId,
  page,
  setComments,
  setPage,
  id,
}: {
  deskId: string | undefined
  page: number
  setPage: Dispatch<SetStateAction<number>>
  setComments: Dispatch<SetStateAction<CommentProps[]>>
  id: string | undefined
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlerDeleteComment = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/comments?id=${id}&deskId=${deskId}&page=${page}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setComments(data.updatedComment)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPage(1)
      setIsLoading(false)
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handlerDeleteComment}
      className="pl-7"
    >
      {isLoading ? (
        <Loading className="h-5 w-5" />
      ) : (
        <Trash2 size={22} strokeWidth={1.5} />
      )}
    </button>
  )
}

const Comments = ({
  deskId,
  user_session,
  isCoLeader,
  isLeader,
  isConnected,
  user,
}: CommentsProps) => {
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
        <div className="flex w-full flex-col gap-y-4 py-4 md:mx-auto md:w-11/12">
          <div className="flex w-full grow-[1] basis-0 flex-wrap justify-center gap-4">
            {isLoading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                      'justify-between border-2 border-grey-400 bg-desk-gradient p-4',
                    )}
                  >
                    <div className="flex w-full items-start justify-between">
                      <Skeleton
                        height={index === 2 ? 68 : index === 3 ? 80 : 24}
                        className="w-3/4"
                      />
                      <Skeleton width={22} height={22} className="ml-7" />
                    </div>
                    <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                      <Skeleton width={120} height={32} />
                      <Skeleton width={210} height={32} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              comments.map((comments) => (
                <AnimationWrapper
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    'flex min-h-[200px] w-full min-w-[360px] max-w-3xl flex-1 flex-col rounded-md md:min-w-[600px]',
                    'justify-between border-2 border-grey-400 bg-desk-gradient p-4 text-white',
                  )}
                  key={comments.id}
                >
                  <div className="flex w-full items-start justify-between">
                    <Text className="break-words">{comments.text}</Text>
                    {(isLeader ||
                      isCoLeader ||
                      user_session === comments.author?.id) && (
                      <DeleteComment
                        id={comments.id}
                        deskId={deskId}
                        page={page}
                        setPage={setPage}
                        setComments={setComments}
                      />
                    )}
                  </div>
                  <CommentWrapper
                    className="pt-8"
                    author={comments.author}
                    createdAt={comments.createdAt}
                  />
                </AnimationWrapper>
              ))
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
        page={page}
        setPage={setPage}
        setComments={setComments}
        deskId={deskId}
        isConnected={isConnected}
        user_session={user_session}
        user={user}
        setCount={setCount}
      />
    </>
  )
}

export default Comments

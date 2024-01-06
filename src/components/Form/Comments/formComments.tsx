/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
import { Dispatch, SetStateAction, useState } from 'react'
import { CommentZodProps, schemaComment } from '@/utils/Zod/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Toast } from '@/utils/toast'
import { api } from '@/utils/api'
import { ClientsProps, CommentProps } from '@/utils/type'
import { Form } from '../index'

type FormCommentsProps = {
  isConnected: boolean
  user_session: string | undefined
  deskId: string | undefined
  user: ClientsProps[]
  setPage: Dispatch<SetStateAction<number>>
  page: number
  setComments: Dispatch<SetStateAction<CommentProps[]>>
  setCount: Dispatch<SetStateAction<number>>
}

const FormComments = ({
  isConnected,
  user_session,
  deskId,
  user,
  setCount,
  setPage,
  setComments,
  page,
}: FormCommentsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CommentZodProps>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schemaComment),
  })

  const handlerFormSubmit = async ({ text }: CommentZodProps) => {
    try {
      setIsLoading(true)

      if (!deskId) return

      const { data } = await api.post(
        `/comments?id=${user_session}&page=${page}`,
        JSON.stringify({ deskId, text }),
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setComments(data.updatedComment)
        setCount(data.count)
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      reset()
      setPage(1)
      setIsLoading(false)
    }
  }

  if (!isConnected) return <></>

  return (
    <Form.Root
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full flex-col items-center gap-y-4"
      handleSubmit={handleSubmit(handlerFormSubmit)}
    >
      <div className="flex w-full flex-col items-end gap-y-3 md:w-3/4">
        <div className="relative flex w-full items-center gap-x-4">
          <img
            alt={user[0].user}
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${user[0].pfp}`}
            className="hidden h-12 w-12 overflow-clip rounded-full object-cover object-center align-top sm:inline md:h-14 md:w-14"
          />
          <Form.Input
            placeholder={`Poste um comentário aqui`}
            label="Poste um comentário sobre essa desk"
            maxLength={190}
            register={register}
            error={errors.text}
            name="text"
            className="w-full"
            image={user[0].pfp}
          />
        </div>
        <Form.Button
          type="submit"
          loading={isLoading}
          className="w-56"
          text="Postar comentário"
        />
      </div>
    </Form.Root>
  )
}

export default FormComments

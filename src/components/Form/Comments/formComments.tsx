/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
import { Dispatch, SetStateAction, useState } from 'react'
import { CommentZodProps, schemaComment } from '@/utils/Zod/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Toast } from '@/utils/toast'
import { api } from '@/utils/api'
import { ClientsProps, RCommentsProps } from '@/utils/type'
import { Form } from '../index'

type FormCommentsProps = {
  isConnected: boolean
  user_session: string | undefined
  deskId: string | undefined
  setCommentsUpdated: Dispatch<SetStateAction<boolean>>
  user: ClientsProps[]
}

const FormComments = ({
  isConnected,
  user_session,
  deskId,
  setCommentsUpdated,
  user,
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

      const { data }: { data: RCommentsProps } = await api.post(
        `/comments?id=${user_session}`,
        JSON.stringify({ deskId, text }),
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setCommentsUpdated(true)
        reset()
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
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
            className="h-12 w-12 overflow-clip rounded-full object-cover object-center align-top md:h-14 md:w-14"
          />
          <Form.Input
            placeholder={`Olá ${user[0].user}, aqui você pode postar um comentário`}
            label="Poste um comentário sobre essa desk"
            maxLength={190}
            register={register}
            error={errors.text}
            name="text"
            className="w-full"
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

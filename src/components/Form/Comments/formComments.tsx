/* eslint-disable camelcase */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CommentZodProps, schemaComment } from '@/utils/Zod/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Toast } from '@/utils/toast'
import { api } from '@/utils/api'
import { RCommentsProps } from '@/utils/type'
import { Form } from '../index'
import Skeleton from '@/components/Layout/skeleton'

type FormCommentsProps = {
  isConnected: boolean
  user_session: string | undefined
  deskId: string | undefined
  setCommentsUpdated: Dispatch<SetStateAction<boolean>>
}

const FormComments = ({
  isConnected,
  user_session,
  deskId,
  setCommentsUpdated,
}: FormCommentsProps) => {
  const [mounted, setMounted] = useState(false)
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

  useEffect(() => {
    setMounted(true)
  }, [])

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

  return (
    <Form.Root
      className="flex w-full flex-col items-center gap-y-4"
      handleSubmit={handleSubmit(handlerFormSubmit)}
    >
      <div className="w-full min-w-[240px] max-w-[650px] shadow-md">
        <Form.Textarea
          maxLength={190}
          error={errors.text}
          name="text"
          register={register}
          placeholder="Comente aqui!"
        />
      </div>
      {!mounted ? (
        <Skeleton height={48} className="w-full min-w-[240px] max-w-[650px]" />
      ) : (
        <Form.Button
          loading={isLoading}
          type="submit"
          text={
            isConnected
              ? 'Comentar'
              : 'Você precisa estar logado para comentar.'
          }
          className="w-full min-w-[240px] max-w-[650px]"
        />
      )}
    </Form.Root>
  )
}

export default FormComments

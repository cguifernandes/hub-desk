/* eslint-disable camelcase */
'use client'
import { CommentZodProps, schemaComment } from '@/utils/Zod/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '..'
import { useEffect, useState } from 'react'
import useClient from '@/hooks/useClient'
import { Toast } from '@/utils/toast'
import { ResponseProps } from '@/utils/type'
import { api } from '@/utils/api'
import Skeleton from '@/components/Layout/skeleton'

const FormComments = ({ deskId }: { deskId: string | undefined }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user_session, isConnected } = useClient()
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

      const { data }: { data: ResponseProps } = await api.post(
        `/comments?id=${user_session}`,
        JSON.stringify({ deskId, text }),
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
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
      className="flex w-full flex-col items-center gap-y-4 py-4"
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

/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Form } from '@/components/Form'
import { AccountProps, schemaAccount } from '@/utils/Zod/account'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { ClientsProps } from '@/utils/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormAccountProps = {
  client: ClientsProps[]
  user_session: string
}

const FormAccount = ({ client, user_session }: FormAccountProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AccountProps>({
    reValidateMode: 'onSubmit',
    defaultValues: { email: client[0].email, user: client[0].user },
    resolver: zodResolver(schemaAccount),
  })

  const handlerUpdateAccount = async ({ email, user }: AccountProps) => {
    try {
      setIsLoading(true)
      const { data } = await api.put(
        `/auth/?id=${user_session}`,
        { email, user },
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        push('/auth/redirect?m=Dados da conta foram alterados!')
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      className="w-11/12 space-y-6 md:w-4/5"
      handleSubmit={handleSubmit(handlerUpdateAccount)}
    >
      <Form.Input error={errors.email} register={register} name="email" />
      <Form.Input
        maxLength={18}
        error={errors.user}
        register={register}
        name="user"
      />
      <Form.Button
        loading={isLoading}
        type="submit"
        className="w-full"
        text="Alterar dados"
      />
    </Form.Root>
  )
}

export default FormAccount

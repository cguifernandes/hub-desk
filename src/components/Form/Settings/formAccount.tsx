/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Form } from '@/components/Form'
import { AccountProps, schemaAccount } from '@/utils/Zod/account'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { ClientsProps } from '@/utils/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../../../../lib/supabase'

type FormAccountProps = {
  client: ClientsProps[]
  user_session: string
}

const FormAccount = ({ client, user_session }: FormAccountProps) => {
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
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

  const handlerUpdateAccount = async (account: AccountProps) => {
    try {
      setIsLoading(true)
      const timestamp = new Date().getTime()
      const storage = await supabase.storage
        .from('hub-desk')
        .upload(`profile/${timestamp}_${account.pfp.name}`, account.pfp)
      account.pfp = storage.data?.path

      const { data } = await api.put(`/auth/?id=${user_session}`, account, {
        headers: { 'Content-Type': 'application/json' },
      })

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

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const fileContent = reader.result
        if (typeof fileContent === 'string') {
          setImageSrc(fileContent)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <Form.Root
      className="w-11/12 space-y-6 md:w-4/5"
      handleSubmit={handleSubmit(handlerUpdateAccount)}
    >
      <div className="relative flex items-center justify-center rounded-full">
        <img
          onMouseEnter={() => setVisibleEdit(true)}
          onMouseLeave={() => setVisibleEdit(false)}
          style={{
            opacity: visibleEdit ? 0.5 : 1,
            border: errors.pfp
              ? '1px rgb(239, 68, 68) solid'
              : '1px solid transparent',
          }}
          className="h-52 w-52 rounded-full object-cover duration-200 ease-out md:h-60 md:w-60"
          src={imageSrc || client[0].pfp}
          alt={client[0].user}
        />
        <input
          {...register('pfp', { onChange: (e) => handleFileInputChange(e) })}
          id="pfp"
          type="file"
          className="hidden"
        />
        <label
          onMouseEnter={() => setVisibleEdit(true)}
          onMouseLeave={() => setVisibleEdit(false)}
          htmlFor="pfp"
          style={{ opacity: visibleEdit ? 1 : 0 }}
          className="absolute z-20 cursor-pointer rounded-full bg-grey-600 p-4 duration-200 ease-out"
        >
          <Pencil color="#fff" size={28} strokeWidth={1.5} />
        </label>
      </div>
      {errors.pfp && (
        <span className="!mt-0 block text-center text-sm text-red-500">
          {errors.pfp.message?.toString()}
        </span>
      )}
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

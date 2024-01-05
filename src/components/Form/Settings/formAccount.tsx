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
import useConnection from '@/hooks/useConnection'
import Skeleton from '@/components/Layout/skeleton'

type FormAccountProps = {
  client: ClientsProps[]
  user_session: string
}

const FormAccount = ({ client, user_session }: FormAccountProps) => {
  const [visibleEditPfp, setVisibleEditPfp] = useState(false)
  const [visibleEditBg, setVisibleEditBg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pfp, setPfp] = useState('')
  const [bg, setBg] = useState('')
  const { client: user, isLoading: loading } = useConnection()
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AccountProps>({
    reValidateMode: 'onSubmit',
    defaultValues: { email: client[0]?.email, user: client[0]?.user },
    resolver: zodResolver(schemaAccount),
  })

  const handlerUpdateAccount = async (account: AccountProps) => {
    try {
      setIsLoading(true)
      if (account.pfp !== undefined) {
        const timestamp = new Date().getTime()
        const storage = await supabase.storage
          .from('hub-desk')
          .upload(
            `profile/${client[0]?.user}/${timestamp}_${account.pfp.name}`,
            account.pfp,
          )
        account.pfp = storage.data?.path
      }

      if (account.bg !== undefined) {
        const timestamp = new Date().getTime()
        const storage = await supabase.storage
          .from('hub-desk')
          .upload(
            `profile/${client[0]?.user}/bg/${timestamp}_${account.bg.name}`,
            account.bg,
          )
        account.bg = storage.data?.path
      }

      const { data } = await api.put(`/auth/?id=${user_session}`, account, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        push('/auth/redirect?m=Os dados da conta foram alterados!')
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileInputChange = ({
    e,
    type,
  }: {
    e: ChangeEvent<HTMLInputElement>
    type: 'bg' | 'pfp'
  }) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const fileContent = reader.result
        if (typeof fileContent === 'string') {
          if (type === 'bg') {
            setBg(fileContent)
          } else {
            setPfp(fileContent)
          }
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
      <div className="relative flex h-[255px] items-center justify-center">
        {loading || user[0]?.pfp === undefined || user[0].bg === undefined ? (
          <>
            <div className="absolute left-0 top-0 h-2/3 w-full">
              <Skeleton className="w-full" height={170} />
            </div>
            <div className="relative top-6 z-20 rounded-full">
              <Skeleton className="h-48 w-48 md:h-52 md:w-52" isRoundedFull />
            </div>
          </>
        ) : (
          <>
            <div
              onMouseEnter={() => setVisibleEditBg(true)}
              onMouseLeave={() => setVisibleEditBg(false)}
              className="absolute left-0 top-0 h-2/3 w-full"
            >
              <input
                {...register('bg', {
                  onChange: (e) => handleFileInputChange({ e, type: 'bg' }),
                })}
                id="bg"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <label
                onMouseEnter={() => setVisibleEditBg(true)}
                onMouseLeave={() => setVisibleEditBg(false)}
                htmlFor="bg"
                style={{ opacity: visibleEditBg ? 1 : 0 }}
                className="absolute right-3 top-3 z-30 cursor-pointer rounded-full bg-grey-600 p-2 duration-200 ease-out"
              >
                <Pencil color="#fff" size={18} strokeWidth={1.5} />
              </label>
              <img
                className="h-full w-full rounded-md object-cover"
                src={
                  bg ||
                  `https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${user[0]?.bg}`
                }
                alt={user[0]?.user}
              />
              <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-grey-700" />
            </div>
            <div
              onMouseEnter={() => setVisibleEditPfp(true)}
              onMouseLeave={() => setVisibleEditPfp(false)}
              className="relative top-6 z-20 rounded-full"
            >
              <img
                style={{
                  border: errors.pfp
                    ? '1px rgb(239, 68, 68) solid'
                    : '1px solid transparent',
                }}
                className="h-48 w-48 rounded-full object-cover duration-200 ease-out md:h-52 md:w-52"
                src={
                  pfp ||
                  `https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${user[0]?.pfp}`
                }
                alt={user[0]?.user}
              />
              <input
                {...register('pfp', {
                  onChange: (e) => handleFileInputChange({ e, type: 'pfp' }),
                })}
                id="pfp"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <label
                onMouseEnter={() => setVisibleEditPfp(true)}
                onMouseLeave={() => setVisibleEditPfp(false)}
                htmlFor="pfp"
                style={{ opacity: visibleEditPfp ? 1 : 0 }}
                className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-grey-600 p-3 duration-200 ease-out"
              >
                <Pencil color="#fff" size={22} strokeWidth={1.5} />
              </label>
              <div
                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-grey-700/50 duration-200 ease-out"
                style={{
                  mixBlendMode: 'multiply',
                  opacity: visibleEditPfp ? 1 : 0,
                }}
              />
            </div>
          </>
        )}
      </div>
      {errors.pfp && (
        <span className="!mt-0 block text-center text-sm text-red-500">
          {errors.pfp.message?.toString()}
        </span>
      )}
      <Form.Input
        error={errors.email}
        register={register}
        placeholder="Email"
        name="email"
        label="E-mail"
      />
      <Form.Input
        maxLength={18}
        error={errors.user}
        register={register}
        name="user"
        placeholder="User"
        label="User"
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

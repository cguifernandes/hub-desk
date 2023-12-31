'use client'
import { Form } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail, UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Toast } from '@/utils/toast'
import { SignUpProps, schemaSignUp } from '@/utils/Zod/sign-up'
import { api } from '@/utils/api'
import { setCookie } from 'nookies'
import useClient from '@/hooks/useClient'

const FormSignUp = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { isConnected } = useClient()

  useEffect(() => {
    if (isConnected) {
      push('/auth/redirect')
    }
  }, [isConnected, push])

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignUpProps>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schemaSignUp),
  })

  const handlerFormSubmit = async (user: SignUpProps) => {
    try {
      setIsLoading(true)
      const { data }: { data: { success: string; error: string; id: string } } =
        await api.post(
          '/auth',
          JSON.stringify({
            password: user.password,
            email: user.email,
            user: user.user,
          }),
        )

      if (data.error) {
        Toast(data.error)
      } else {
        reset()
        Toast(data.success)
        push('/')
        setCookie(null, 'user_session', data.id, {
          path: '/',
          maxAge: undefined,
          SameSite: 'None',
          Secure: true,
        })
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      handleSubmit={handleSubmit(handlerFormSubmit)}
      className="space-y-8"
    >
      <Form.Input
        error={errors.email}
        register={register}
        name="email"
        placeholder="E-mail"
        label="E-mail"
      >
        <Mail
          className="absolute right-4"
          color="#fff"
          strokeWidth={1.5}
          size={26}
        />
      </Form.Input>
      <Form.Input
        error={errors.user}
        register={register}
        name="user"
        placeholder="User"
        maxLength={18}
        label="User"
      >
        <UserCircle
          className="absolute right-4"
          color="#fff"
          strokeWidth={1.5}
          size={26}
        />
      </Form.Input>
      <Form.Input
        type={visiblePassword ? 'text' : 'password'}
        error={errors.password}
        register={register}
        name="password"
        placeholder="Senha"
        label="Senha"
      >
        {!visiblePassword ? (
          <Eye
            onClick={() => setVisiblePassword(true)}
            color="#fff"
            strokeWidth={1.5}
            size={26}
            className="absolute right-4 z-40 cursor-pointer"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setVisiblePassword(false)}
            color="#fff"
            strokeWidth={1.5}
            size={26}
            className="absolute right-4 z-40 cursor-pointer"
          />
        )}
      </Form.Input>
      <Form.Button
        loading={isLoading}
        type="submit"
        className="w-full"
        text="Cadastrar"
      />
    </Form.Root>
  )
}

export default FormSignUp

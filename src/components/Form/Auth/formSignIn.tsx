'use client'
import { Form } from '@/components/Form'
import { SignInProps, schemaSignIn } from '@/utils/Zod/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { ResponseProps } from '@/utils/type'
import { setCookie } from 'nookies'
import { ROUTES } from '@/utils/constant'
import useClient from '@/hooks/useClient'

const FormSignIn = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { isConnected } = useClient()

  useEffect(() => {
    if (isConnected) {
      push(ROUTES.public.redirect)
    }
  }, [isConnected, push])

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignInProps>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schemaSignIn),
  })

  const handlerFormSubmit = async (user: SignInProps) => {
    try {
      setIsLoading(true)
      const { data }: { data: ResponseProps } = await api.post(
        '/auth/verification',
        JSON.stringify({
          password: user.password,
          email: user.email,
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        reset()
        push(ROUTES.public.home)

        if (user.rememberUser) {
          setCookie(null, 'user_session', data.id, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            SameSite: 'None',
            Secure: true,
          })
        } else {
          setCookie(null, 'user_session', data.id, {
            path: '/',
            maxAge: undefined,
            SameSite: 'Lax',
            Secure: true,
          })
        }
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
      className="space-y-8 pt-12"
    >
      <Form.Input
        error={errors.email}
        register={register}
        name="email"
        placeholder="E-mail"
      >
        <Mail
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
        text="Logar"
      />
      <Form.Wrapper name="rememberUser" register={register} />
    </Form.Root>
  )
}

export default FormSignIn

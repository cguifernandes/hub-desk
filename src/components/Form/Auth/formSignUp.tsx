'use client'
import { Form } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail, UserCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ErrorToast, SuccessToast } from '@/utils/toast'
import { SignUpProps, schemaSignUp } from '@/utils/Zod/sign-up'
import { api } from '@/utils/api'
import { ResponseProps } from '@/utils/type'
import { setCookie } from 'nookies'
import useConnection from '@/hooks/useConnection'

const FormSignUp = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [name, setName] = useState(String)
  const { push } = useRouter()
  const { isConnected } = useConnection()

  useEffect(() => {
    if (isConnected) {
      push('/auth/redirect')
    }
  }, [isConnected, push])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpProps>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schemaSignUp),
  })

  const handlerFormSubmit = async (user: SignUpProps) => {
    try {
      setIsLoading(true)
      const { data }: { data: ResponseProps } = await api.post(
        '/auth',
        JSON.stringify({
          password: user.password,
          email: user.email,
          name: user.name,
        }),
      )

      if (data.error) {
        ErrorToast(data.error)
      } else {
        SuccessToast(data.success)
        setName('')
        setEmail('')
        setPassword('')
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

  if (isConnected) {
    push('/')
  }

  return (
    <Form.Root
      handleSubmit={handleSubmit(handlerFormSubmit)}
      className="space-y-8 py-12"
    >
      <Form.Input
        error={errors.email}
        register={register}
        name="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      >
        <Mail color="#fff" strokeWidth={1.5} size={30} />
      </Form.Input>
      <Form.Input
        error={errors.name}
        register={register}
        name="name"
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
        value={name}
      >
        <UserCircle2 color="#fff" strokeWidth={1.5} size={30} />
      </Form.Input>
      <Form.Input
        type={visiblePassword ? 'text' : 'password'}
        error={errors.password}
        register={register}
        name="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      >
        {!visiblePassword ? (
          <Eye
            onClick={() => setVisiblePassword(true)}
            color="#fff"
            strokeWidth={1.5}
            size={30}
            className="z-40 cursor-pointer"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setVisiblePassword(false)}
            color="#fff"
            strokeWidth={1.5}
            size={30}
            className="z-40 cursor-pointer"
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

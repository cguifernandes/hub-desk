'use client'
import { Form } from '@/components/Form'
import { SignInProps, schemaSignIn } from '@/utils/Zod/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { ErrorToast, SuccessToast } from '@/utils/toast'
import { ResponseProps } from '@/utils/type'

const FormSignIn = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>({
    reValidateMode: 'onBlur',
    resolver: zodResolver(schemaSignIn),
  })

  const handlerFormSubmit = async (user: SignInProps) => {
    try {
      setIsLoading(true)
      const { data }: { data: ResponseProps } = await api.post(
        '/clients/verification',
        JSON.stringify({ password: user.password, email: user.email }),
      )

      if (data.error) {
        ErrorToast(data.error)
      } else {
        SuccessToast(data.success)
        setEmail('')
        setPassword('')
        push('/')
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
        <Mail color="#fff" strokeWidth={1.25} size={28} />
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
            strokeWidth={1.25}
            size={28}
            className="z-40 cursor-pointer"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setVisiblePassword(false)}
            color="#fff"
            strokeWidth={1.25}
            size={28}
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
      <Form.Wrapper name="rememberUser" register={register} />
    </Form.Root>
  )
}

export default FormSignIn

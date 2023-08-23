'use client'
import { Form } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ErrorToast } from '@/utils/toast'
import { SignUpProps, schemaSignUp } from '@/utils/Zod/sign-up'

const FormSignUp = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [name, setName] = useState(String)
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpProps>({
    reValidateMode: 'onChange',
    resolver: zodResolver(schemaSignUp),
  })

  const handlerFormSubmit = async (data: SignUpProps) => {
    try {
      const clients = await fetch('/api/clients')
      const users = await clients.json()

      const emails = users.some(
        (user: SignUpProps) => user.email === data.email,
      )

      if (emails) {
        ErrorToast('Este e-mail já está sendo usado!')
      } else {
        setIsLoading(true)

        await fetch('/api/clients', {
          method: 'POST',
          body: JSON.stringify(data),
        })

        setIsLoading(false)
        setEmail('')
        setPassword('')
        setName('')
        push('/')
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
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
        error={errors.name}
        register={register}
        name="name"
        placeholder="Nome"
        onChange={(e) => setName(e.target.value)}
        value={name}
      >
        <UserCircle2 color="#fff" strokeWidth={1.25} size={28} />
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
    </Form.Root>
  )
}

export default FormSignUp

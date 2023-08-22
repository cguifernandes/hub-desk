'use client'
import { Form } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaAuth = z.object({
  name: z
    .string()
    .nonempty('O campo "User" é obrigatório.')
    .toLowerCase()
    .max(16, 'O user deve ter no máximo 16 caracteres')
    .refine(
      (user) =>
        /^[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(user.charAt(0)) === false,
      'O user não deve começar com um caractere especial.',
    ),
  email: z
    .string()
    .email('O e-mail precisa ser válido.')
    .nonempty('O campo "E-mail" é obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa ter 6 caracteres.')
    .max(12, 'A senha deve ter no máximo 12 caracteres.')
    .nonempty('O campo "Senha" é obrigatório.')
    .refine(
      (password) => /[A-Z]/.test(password),
      'A senha deve ter uma letra maiúscula.',
    )
    .refine(
      (password) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
      'A senha deve incluir pelo menos um caractere especial.',
    ),
})

type AuthFormProps = z.infer<typeof schemaAuth>

const FormSignUp = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const [name, setName] = useState(String)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthFormProps>({
    reValidateMode: 'onChange',
    resolver: zodResolver(schemaAuth),
  })

  const handlerFormSubmit = async (data: AuthFormProps) => {
    try {
      setIsLoading(true)

      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      setEmail('')
      setPassword('')
      setName('')
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

'use client'
import { Form } from '@/components/Form'
import { SignInProps, schemaSignIn } from '@/utils/Zod/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOffIcon, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const FormSignIn = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>({
    reValidateMode: 'onBlur',
    resolver: zodResolver(schemaSignIn),
  })

  const handlerFormSubmit = (data: SignInProps) => {
    console.log(data)
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
      >
        <Mail color="#fff" strokeWidth={1.25} size={28} />
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
      <Form.Button type="submit" className="w-full" text="Cadastrar" />
      <Form.Wrapper name="rememberUser" register={register} />
    </Form.Root>
  )
}

export default FormSignIn

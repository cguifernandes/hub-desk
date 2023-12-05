/* eslint-disable camelcase */
import { Form } from '@/components/Form'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { Eye, EyeOffIcon } from 'lucide-react'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

type ConfirmPasswordProps = {
  setConfirmPassword: Dispatch<SetStateAction<boolean>>
  user_session: string
}

const ConfirmPassword = ({
  setConfirmPassword,
  user_session,
}: ConfirmPasswordProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlerVerify = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      const { data } = await api.get(
        `/auth/confirmPassword?id=${user_session}&password=${password}`,
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        setConfirmPassword(true)
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-96 w-full flex-col items-center rounded-md border border-grey-400 p-4 backdrop-blur">
      <div className="flex flex-col items-center justify-center space-y-1 px-4 pt-4 text-center">
        <Heading size="md" className="text-white">
          Confirmar senha
        </Heading>
        <Text className="text-white/50">
          Por favor, confirme sua senha para ter acesso aos dados da conta
        </Text>
      </div>
      <Form.Root
        handleSubmit={handlerVerify}
        className="my-auto w-full max-w-[560px] items-center space-y-6 py-4 md:w-4/5"
      >
        <Form.Input
          type={visiblePassword ? 'text' : 'password'}
          placeholder="Senha"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
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
        <Form.Button loading={isLoading} className="w-full" text="Enviar" />
      </Form.Root>
    </div>
  )
}

export default ConfirmPassword

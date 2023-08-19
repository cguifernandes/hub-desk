import Heading from '@/components/heading'
import Text from '@/components/text'
import Image from 'next/image'
import LogoImage from '../../../../public/logoImage.svg'
import { Metadata } from 'next'
import { Form } from '@/components/form'

export const metadata: Metadata = {
  title: 'Logar | Hub Desk',
}

const SignIn = () => {
  return (
    <div className="w-[600px] rounded-md bg-grey-600 p-10 shadow-lg">
      <header className="flex items-center justify-between">
        <div>
          <Heading className="font-montserrat text-3xl">Login</Heading>
          <Text className="text-white/50">
            Ainda não tem uma conta?{' '}
            <a
              href="sign-up"
              className="text-sky-600 transition-colors hover:text-sky-700"
            >
              Criar uma conta.
            </a>
          </Text>
        </div>
        <Image
          quality={100}
          width={52}
          height={52}
          alt="Logo imagem"
          src={LogoImage}
        />
      </header>
      <Form.Root className="space-y-8 pt-12">
        <Form.Input placeholder="E-mail" />
        <Form.Input placeholder="Senha" />
        <Form.Button className="w-full" text="Logar" />
      </Form.Root>
    </div>
  )
}

export default SignIn

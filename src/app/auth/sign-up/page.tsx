import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import FormSignUp from '@/components/Form/Auth/formSignUp'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cadastrar | Hub Desk',
}

const SignUp = () => {
  return (
    <>
      <header className="flex flex-col gap-y-1">
        <Heading className="text-3xl">Registrar</Heading>
        <Text size="sm" className="text-white/50">
          Já possui uma conta?{' '}
          <Link href="sign-in" className="gradient-text">
            Logar.
          </Link>
        </Text>
      </header>
      <FormSignUp />
    </>
  )
}

export default SignUp

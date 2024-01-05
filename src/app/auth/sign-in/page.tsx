import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import FormSignIn from '@/components/Form/Auth/formSignIn'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login | Hub Desk',
}

const SignIn = () => {
  return (
    <>
      <header className="flex flex-col gap-y-1">
        <Heading className="text-3xl">Login</Heading>
        <Text size="sm" className="text-white/50">
          Ainda não tem uma conta?{' '}
          <Link href="sign-up" className="gradient-text">
            Criar uma conta.
          </Link>
        </Text>
      </header>
      <FormSignIn />
    </>
  )
}

export default SignIn

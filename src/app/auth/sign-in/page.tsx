import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import FormSignIn from '@/components/Form/Auth/formSignIn'
import Back from '@/components/back'

export const metadata: Metadata = {
  title: 'Login | Hub Desk',
}

const SignIn = () => {
  return (
    <>
      <Back href="/" />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="w-full max-w-[550px] rounded-md bg-grey-gradient p-10 shadow-lg">
          <header className="flex flex-col gap-y-1">
            <Heading className="text-3xl">Login</Heading>
            <Text size="sm" className="text-white/50">
              Ainda não tem uma conta?{' '}
              <a href="sign-up" className="gradient-text">
                Criar uma conta.
              </a>
            </Text>
          </header>
          <FormSignIn />
        </div>
      </div>
    </>
  )
}

export default SignIn

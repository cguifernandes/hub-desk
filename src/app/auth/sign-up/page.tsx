import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import FormSignUp from '@/components/Form/Auth/formSignUp'
import Back from '@/components/back'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cadastrar | Hub Desk',
}

const SignUp = () => {
  return (
    <>
      <Back href="/" />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="w-full max-w-[550px] rounded-md bg-grey-gradient p-10 shadow-lg">
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
        </div>
      </div>
    </>
  )
}

export default SignUp

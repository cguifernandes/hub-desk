import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import FormSignUp from '@/components/Form/Auth/formSignUp'
import Back from '@/components/back'

export const metadata: Metadata = {
  title: 'Cadastrar | Hub Desk',
}

const SignUp = () => {
  return (
    <>
      <Back href="/" />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="w-full max-w-[550px] rounded-md bg-grey-600 p-10 shadow-lg">
          <header className="flex flex-col gap-y-1">
            <Heading className="font-montserrat text-3xl">Registrar</Heading>
            <Text size="sm" className="text-white/50">
              Já possui uma conta?{' '}
              <a
                href="sign-in"
                className="text-sky-600 transition-colors hover:text-sky-700"
              >
                Logar.
              </a>
            </Text>
          </header>
          <FormSignUp />
        </div>
      </div>
    </>
  )
}

export default SignUp

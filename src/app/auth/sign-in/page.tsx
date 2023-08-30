import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import { Facebook, Github } from 'lucide-react'
import Google from '../../../../public/googleLogo.svg'
import Linkedin from '../../../../public/linkedinLogo.svg'
import Image from 'next/image'
import FormSignIn from '@/components/Form/Auth/formSignIn'
import Line from '@/components/line'
import Back from '@/components/back'

export const metadata: Metadata = {
  title: 'Logar | Hub Desk',
}

const SignIn = () => {
  return (
    <>
      <Back href="/" />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="w-full max-w-[550px] rounded-md bg-grey-600 p-10 shadow-lg">
          <header className="flex flex-col gap-y-1">
            <Heading className="font-montserrat text-3xl">Login</Heading>
            <Text size="sm" className="text-white/50">
              Ainda não tem uma conta?{' '}
              <a
                href="sign-up"
                className="text-sky-600 transition-colors hover:text-sky-700"
              >
                Criar uma conta.
              </a>
            </Text>
          </header>
          <FormSignIn />
          <Line />
          <div className="grid grid-cols-2 grid-rows-2 justify-between justify-items-center gap-5 pt-12 sm:grid-cols-4 sm:grid-rows-1">
            <button className="flex h-16 w-full items-center justify-center rounded-md bg-black transition-colors hover:bg-[#202020] sm:w-24">
              <Github fill="#fff" strokeWidth={0.5} color="#fff" size={28} />
            </button>
            <button className="flex h-16 w-full items-center justify-center rounded-md bg-[#176DF0] transition-colors hover:bg-[#176ef0ab] sm:w-24">
              <Facebook fill="#fff" strokeWidth={0.5} color="#fff" size={28} />
            </button>
            <button className="flex h-16 w-full items-center justify-center rounded-md bg-[#0e76a8] transition-colors hover:bg-[#0e77a8c9] sm:w-24">
              <Image src={Linkedin} alt="Google logo" width={28} />
            </button>
            <button className="flex h-16 w-full items-center justify-center rounded-md bg-white transition-colors hover:bg-[#ddd] sm:w-24">
              <Image src={Google} alt="Google logo" width={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn

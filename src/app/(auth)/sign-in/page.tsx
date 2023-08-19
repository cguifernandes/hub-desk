import Heading from '@/components/heading'
import Text from '@/components/text'
import { Metadata } from 'next'
import { Form } from '@/components/form'
import { Eye, Facebook, Github, Mail } from 'lucide-react'
import clsx from 'clsx'
import Google from '../../../../public/googleLogo.svg'
import Linkedin from '../../../../public/linkedinLogo.svg'
import Image from 'next/image'

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
      </header>
      <Form.Root className="space-y-8 py-12">
        <Form.Input className="relative" placeholder="E-mail">
          <div
            className={clsx(
              'absolute right-0 top-[50%] flex w-[60px] justify-center',
              ' h-[60px] -translate-y-[50%] items-center rounded-r-md bg-sky-700',
            )}
          >
            <Mail color="#fff" strokeWidth={1.25} size={28} />
          </div>
        </Form.Input>
        <Form.Input placeholder="Senha">
          <div
            className={clsx(
              'absolute right-0 top-[50%] flex w-[60px] justify-center bg-sky-700',
              ' h-[60px] -translate-y-[50%] items-center rounded-r-md',
            )}
          >
            <Eye color="#fff" strokeWidth={1.25} size={28} />
          </div>
        </Form.Input>
        <Form.Button className="w-full" text="Logar" />
      </Form.Root>
      <div className="h-[2px] w-full bg-grey-400" />
      <div className="flex justify-around pt-12">
        <button className="flex h-16 w-24 items-center justify-center rounded-md bg-black transition-colors hover:bg-[#202020]">
          <Github fill="#fff" strokeWidth={0.5} color="#fff" size={28} />
        </button>
        <button className="flex h-16 w-24 items-center justify-center rounded-md bg-[#176DF0] transition-colors hover:bg-[#176ef0ab]">
          <Facebook fill="#fff" strokeWidth={0.5} color="#fff" size={28} />
        </button>
        <button className="flex h-16 w-24 items-center justify-center rounded-md bg-[#0e76a8] transition-colors hover:bg-[#0e77a8c9]">
          <Image src={Linkedin} alt="Google logo" width={28} />
        </button>
        <button className="flex h-16 w-24 items-center justify-center rounded-md bg-white transition-colors hover:bg-[#ddd]">
          <Image src={Google} alt="Google logo" width={28} />
        </button>
      </div>
    </div>
  )
}

export default SignIn

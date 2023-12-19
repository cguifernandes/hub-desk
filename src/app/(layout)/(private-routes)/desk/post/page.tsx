import FormDesk from '@/components/Form/Desk/formDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar uma desk | Hub Desk',
}

const Desk = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center">
      <>
        <div className="w-[90%] py-8 text-center sm:w-[80%] lg:w-[920px] lg:px-10 xl:w-[1020px]">
          <Heading size="lg">
            Crie uma desk para que você possa discutir sua opinião com a
            comunidade
          </Heading>
          <Text className="text-white/50">Campos com “*” são obrigatórios</Text>
        </div>
        <div className="flex w-full flex-col items-center justify-evenly gap-y-12 px-4 pb-8 lg:flex-row">
          <FormDesk />
        </div>
      </>
    </section>
  )
}

export default Desk

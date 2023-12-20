import FormDesk from '@/components/Form/Desk/formDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar uma desk | Hub Desk',
}

const Desk = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center py-8 lg:py-10">
      <div className="w-full px-8 pb-4 text-center lg:px-10 lg:pb-6">
        <Heading className="text-xl md:text-2xl">
          Crie uma desk para que você possa discutir sua opinião com a
          comunidade
        </Heading>
        <Text className="text-white/50">Campos com “*” são obrigatórios</Text>
      </div>
      <FormDesk />
    </section>
  )
}

export default Desk

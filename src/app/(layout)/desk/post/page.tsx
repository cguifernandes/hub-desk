import FormDesk from '@/components/Form/Desk/formDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar uma desk | Hub Desk',
}

const Desk = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_192px)] flex-col items-center">
      <div className="w-[90%] py-16 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
        <Heading size="md">
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

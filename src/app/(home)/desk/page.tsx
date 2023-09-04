import FormDesk from '@/components/Form/Desk/formDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar uma desk | Hub Desk',
}

const Desk = () => {
  return (
    <main className="mt-24">
      <section className="bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="flex flex-col items-center py-16">
          <Heading size="md">
            Crie uma desk para que você possa discutir sua opinião com a
            comunidade.
          </Heading>
          <Text className="text-white/50">Campos com “*” são obrigatórios</Text>
        </div>
        <div className="flex items-center justify-around py-12">
          <FormDesk />
          <div className="flex flex-[0.40] justify-center">
            <div className="h-[700px] w-[500px] border border-white"></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Desk

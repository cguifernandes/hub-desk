import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'

const Desk = () => {
  return (
    <main className="pt-24">
      <section className="h-[calc(100vh_-_96px)] bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="flex flex-col items-center py-16">
          <Heading size="md">
            Crie uma desk para que você possa discutir sua opinião com a
            comunidade.
          </Heading>
          <Text className="text-white/50">Campos com “*” são obrigatórios</Text>
        </div>
        <div></div>
      </section>
    </main>
  )
}

export default Desk

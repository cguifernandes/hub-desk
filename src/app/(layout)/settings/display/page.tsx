import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import DisplaySelect from '@/components/displaySelect'

const Display = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-y-6 sm:flex-row">
      <div className="w-full space-y-2 sm:w-8/12 sm:pr-8">
        <Heading size="md">Itens por página</Heading>
        <Text className="text-white/50">
          A opção &#34;Itens por página&#34; permite que você personalize
          quantos elementos deseja visualizar de uma só vez. Essa configuração
          oferece maior controle sobre a quantidade de conteúdo exibido,
          adaptando a experiência de navegação às suas preferências individuais.
        </Text>
      </div>
      <DisplaySelect />
    </div>
  )
}

export default Display

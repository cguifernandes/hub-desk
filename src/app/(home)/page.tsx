import Button from '@/components/button'
import Heading from '@/components/heading'
import Text from '@/components/text'
import Topics from '@/components/topics'

export default function Home() {
  return (
    <main className="mt-[10vh] ">
      <div className="flex h-[90vh] items-center justify-center bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="w-[90%] space-y-4 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
          <Heading size="xlg">O que é o Hub Desk</Heading>
          <Text className="!text-base text-white/60">
            Você já se sentiu frustrado por não conseguir encontrar um lugar
            para discutir ideias e opiniões com outras pessoas que compartilham
            seus interesses? Ou talvez você já tenha tentado participar de
            fóruns online, mas achou difícil acompanhar as discussões e
            interagir com outros membros? Crie uma mesa de discussão no Hub Desk
            e comece a fazer parte de uma comunidade de pessoas apaixonadas por
            tópicos semelhantes aos seus. Não perca mais tempo tentando
            encontrar um lugar para discutir suas ideias e opiniões. Junte-se a
            nossa comunidade hoje!
          </Text>
          <Button text="Criar uma desk" className="!mt-8 w-full sm:w-[60%]" />
        </div>
      </div>
      <Topics />
    </main>
  )
}

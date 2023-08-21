import Button from '@/components/button'
import Heading from '@/components/heading'
import Text from '@/components/text'
import Topics from '@/components/topics'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Hub Desk',
}

const Home = () => {
  return (
    <main className="mt-24">
      <section className="flex h-[90vh] items-center justify-center bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="w-[90%] space-y-4 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
          <Heading className="font-semibold" align="center" size="lg">
            O que é o Hub Desk
          </Heading>
          <Text align="center" className="text-base text-white/60">
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
      </section>
      <section className="space-y-6 bg-gradient-to-t from-grey-550 to-grey-500 py-14">
        <Heading className="font-semibold" align="center" size="lg">
          Tópicos em destaque
        </Heading>
        <div className="mx-5 flex flex-wrap justify-center gap-10 md:mx-10">
          <Topics text="Animes" />
          <Topics text="Filmes" />
          <Topics text="Desenhos" />
          <Topics text="Sites" />
          <Topics text="Séries" />
          <Topics text="Outros" />
        </div>
      </section>
    </main>
  )
}

export default Home

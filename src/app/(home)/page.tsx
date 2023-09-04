import Button from '@/components/button'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Topics from '@/components/topics'
import { Metadata } from 'next'
import { categories } from '@/utils/const'

export const metadata: Metadata = {
  title: 'Home | Hub Desk',
}

const Home = () => {
  return (
    <main className="mt-24">
      <section className="flex h-[calc(100vh_-_96px)] items-center justify-center bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="w-[90%] space-y-4 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
          <Heading className="font-semibold" align="center" size="lg">
            O que é o Hub Desk
          </Heading>
          <Text align="center" className="text-white/60">
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
          <Button
            href="/desk"
            text="Criar uma desk"
            className="m-auto !mt-8 w-full sm:w-[60%]"
          />
        </div>
      </section>
      <section className="space-y-6 bg-gradient-to-t from-grey-550 to-grey-500 py-14">
        <Heading className="font-semibold" align="center" size="lg">
          Tópicos em destaque
        </Heading>
        <div className="mx-5 flex flex-wrap justify-center gap-10 md:mx-10">
          {categories.map((categories) => (
            <Topics key={categories.id} size="md" text={categories.name} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home

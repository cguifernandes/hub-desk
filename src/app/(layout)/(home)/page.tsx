import Button from '@/components/button'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Topics from '@/components/Layout/topics'
import { Metadata } from 'next'
import { categories } from '@/utils/constant'
import { ExternalLink } from 'lucide-react'
import { FakeRDeskProps } from '@/utils/type'
import FakeDesk from '@/components/fakeDesk'
import FakeNetflix from '../../../../public/fakeNetflixCard.png'

export const metadata: Metadata = {
  title: 'Home | Hub Desk',
}

const fakeDataHubDesk: FakeRDeskProps = {
  title: 'Hub Desk',
  category: 'Sites',
  description:
    'Olá pessoal, vocês poderiam opinar sobre esse site que estou criando?',
}

const fakeDataNetflix: FakeRDeskProps = {
  title: 'Netflix',
  category: 'Sites',
  description:
    'Olá pessoal, vocês poderiam opinar sobre esse site que estou criando?',
  src: FakeNetflix.src,
}

const Home = () => {
  return (
    <>
      <section className="flex h-[calc(100vh_-_80px)] items-center justify-between px-32">
        <div className="w-[710px] space-y-4">
          <Heading className="font-medium" align="left" size="lg">
            O que é o Hub Desk
          </Heading>
          <Text align="left" className="text-white/60">
            O <span className="gradient-text">Hub Desk</span> é uma plataforma
            que permite aos usuários criar uma mesa de discussão dedicada a um
            tópico específico. Nela, os participantes podem compartilhar ideias,
            trocar informações e debater sobre um assunto em questão.
          </Text>
          <Button
            href="/post-desk"
            text="Criar uma desk"
            className="flex w-96 items-center justify-between "
          >
            <ExternalLink strokeWidth={1.5} size={22} className="ml-2" />
          </Button>
        </div>
        <div className="relative h-[730px] w-[670px]">
          <FakeDesk
            className="absolute bottom-0 left-0 z-10"
            data={fakeDataHubDesk}
          />
          <FakeDesk
            delay
            className="absolute right-0 top-0"
            data={fakeDataNetflix}
          />
        </div>
      </section>
      <section className="space-y-6 py-14">
        <Heading className="font-semibold" align="center" size="lg">
          Tópicos em destaque
        </Heading>
        <div className="flex w-full grow-[1] basis-0 flex-wrap gap-6 p-6">
          {categories.map((categories) => (
            <Topics
              className="min-w-[290px] flex-1"
              key={categories.path}
              href={categories.path}
              size="md"
              text={categories.name}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home

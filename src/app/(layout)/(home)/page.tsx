import Button from '@/components/button'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Metadata } from 'next'
import { categories } from '@/utils/constant'
import { ExternalLink } from 'lucide-react'
import { FakeRDeskProps } from '@/utils/type'
import FakeDesk from '@/components/fakeDesk'
import FakeNetflix from '../../../../public/fakeNetflixCard.png'
import AnimationWrapper from '@/components/Wrapper/animationWrapper'
import Carousel from '@/components/Layout/carousel'

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
      <section className="m-auto flex h-[calc(100vh_-_80px)] w-full items-center justify-center lg:max-w-[1890px] lg:justify-between lg:px-10 xl:px-16">
        <AnimationWrapper
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-8 w-full space-y-4 text-center sm:w-[710px] lg:m-0 lg:mr-6 lg:text-left"
        >
          <Heading className="font-medium" size="lg">
            O que é o Hub Desk
          </Heading>
          <Text className="text-white/50">
            O <span className="gradient-text">Hub Desk</span> é uma plataforma
            que permite aos usuários criar uma mesa de discussão dedicada a um
            tópico específico. Nela, os participantes podem compartilhar ideias,
            trocar informações e debater sobre um assunto em questão.
          </Text>
          <Button
            href="/desk/post"
            text="Criar uma desk"
            className="m-auto flex w-4/5 items-center justify-between sm:w-[420px] lg:m-0 lg:w-96"
          >
            <ExternalLink strokeWidth={1.5} size={22} className="ml-2" />
          </Button>
        </AnimationWrapper>
        <div className="relative hidden h-[730px] w-[670px] lg:inline">
          <FakeDesk
            delay
            className="absolute bottom-0 left-0 z-10 lg:h-[480px] lg:w-[370px] xl:h-[560px] xl:w-[450px]"
            data={fakeDataHubDesk}
          />
          <FakeDesk
            className="absolute right-0 top-0 lg:h-[480px] lg:w-[370px] xl:h-[560px] xl:w-[450px]"
            data={fakeDataNetflix}
          />
        </div>
      </section>
      <section className="py-14">
        <Heading className="font-medium" align="center" size="lg">
          Tópicos em destaque
        </Heading>
        <div className="flex w-full grow-[1] basis-0 flex-wrap">
          {categories.map((categories, index) => (
            <AnimationWrapper
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="w-full space-y-4 px-10 py-6"
              key={index}
            >
              <Heading className="font-medium" size="md">
                {categories.value}
              </Heading>
              <Carousel category={categories.value} />
            </AnimationWrapper>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home

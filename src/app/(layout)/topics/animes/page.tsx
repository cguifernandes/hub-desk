import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Carousel from '@/components/carousel'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tópico Animes | Hub Desk',
}

export default async function Animes() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
        <Heading size="lg" align="center" className="text-white">
          Tópicos
        </Heading>
        <Text className="text-white/50">Animes</Text>
      </div>
      <Carousel category="Animes" />
    </>
  )
}
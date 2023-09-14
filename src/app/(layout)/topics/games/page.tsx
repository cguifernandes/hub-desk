import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Carousel from '@/components/carousel'
import { url } from '@/utils/constant'
import { RDeskProps } from '@/utils/type'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tópico Jogos | Hub Desk',
}

async function getStaticProps() {
  const response = await fetch(
    `${url}/api/desks/getWithCategory?category=Jogos`,
    { cache: 'no-store' },
  )

  return await response.json()
}

const Games = async () => {
  const { data }: { data: RDeskProps[] } = await getStaticProps()

  return (
    <>
      <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
        <Heading size="lg" align="center" className="text-white">
          Tópicos
        </Heading>
        <Text className="text-white/50">Jogos</Text>
      </div>
      <Carousel data={data} />
    </>
  )
}

export default Games

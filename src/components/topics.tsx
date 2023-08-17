import { ArrowUpRightIcon } from 'lucide-react'
import Heading from './heading'
import Text from './text'

const Topics = () => {
  return (
    <div className="my-10">
      <Heading align="center" size="lg">
        Tópicos em destaque
      </Heading>
      <div className="relative flex h-[220px] w-[420px] cursor-pointer items-center justify-center rounded-md bg-sky-700 transition-colors hover:bg-sky-800">
        <Text className="font-montserrat" size="lg">
          Animes
        </Text>
        <span className="absolute bottom-6 right-6 flex items-center text-white">
          Ver mais <ArrowUpRightIcon size={24} className="mx-1" />
        </span>
      </div>
    </div>
  )
}

export default Topics

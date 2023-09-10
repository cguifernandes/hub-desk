import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { Player } from '@lottiefiles/react-lottie-player'
import Link from 'next/link'
import EmptyAnimation from '../../../../public/emptyAnimation.json'

const EmptyAlert = () => {
  return (
    <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <Heading size="lg" className="text-white">
            Você não tem nenhuma Desk
          </Heading>
          <Text>
            <Link
              href={'/desk'}
              className="text-sky-600 transition-colors hover:text-sky-700"
            >
              Clique aqui
            </Link>{' '}
            para criar uma nova desk
          </Text>
        </div>
        <Player src={EmptyAnimation} autoplay keepLastFrame className="w-96" />
      </div>
    </div>
  )
}

export default EmptyAlert

import { Player } from '@lottiefiles/react-lottie-player'
import Heading from '../Typography/heading'
import Text from '../Typography/text'
import RedirectAnimation from '../../../public/redirectAnimation.json'

type RedirectProps = {
  text: string
  subtext: string
}

const RedirectWrapper = ({ subtext, text }: RedirectProps) => {
  return (
    <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <Heading size="lg" className="text-white">
            {text}
          </Heading>
          <Text className="text-white/50">{subtext}</Text>
        </div>
        <Player
          src={RedirectAnimation}
          autoplay
          keepLastFrame
          className="w-64"
        />
      </div>
    </div>
  )
}

export default RedirectWrapper

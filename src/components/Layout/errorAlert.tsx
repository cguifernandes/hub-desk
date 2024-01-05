'use client'
import { Player } from '@lottiefiles/react-lottie-player'
import ErrorAnimation from '../../../public/errorAnimation.json'

const ErrorAlert = () => {
  return (
    <Player
      src={ErrorAnimation}
      autoplay
      keepLastFrame
      className="w-64"
      speed={0.8}
    />
  )
}

export default ErrorAlert

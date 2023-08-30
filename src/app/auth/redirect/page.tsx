'use client'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { useRouter } from 'next/navigation'
import { Player } from '@lottiefiles/react-lottie-player'
import { useEffect } from 'react'
import SucessAnimation from '../../../../public/success.json'
import Back from '@/components/back'

const Redirect = () => {
  const { push } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      push('/')
    }, 3000)
  }, [push])

  return (
    <>
      <Back />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="space-y-6">
          <div className="space-y-1 text-center">
            <Heading size="xlg" className="text-white">
              A autenticação foi um sucesso!
            </Heading>
            <Text className="text-white/50">Você será redirecionado.</Text>
          </div>
          <Player
            src={SucessAnimation}
            autoplay
            keepLastFrame
            className="w-60"
          />
        </div>
      </div>
    </>
  )
}

export default Redirect

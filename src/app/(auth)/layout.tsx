import { ReactNode } from 'react'
import Waves from '../../../public/wavesBG.png'
import Back from '@/components/back'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main
      style={{ backgroundImage: `url(${Waves.src})` }}
      className="min-h-screen bg-cover p-5 pt-8 sm:pt-14"
    >
      <Back />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        {children}
      </div>
    </main>
  )
}

export default Layout

import { ReactNode } from 'react'
import Waves from '../../../public/scene.svg'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth | Hub Desk',
}

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main
      style={{ backgroundImage: `url(${Waves.src})` }}
      className="min-h-screen bg-cover p-5 pt-8 sm:pt-14"
    >
      {children}
    </main>
  )
}

export default Layout

import { ReactNode } from 'react'
import Waves from '../../../public/scene.svg'
import { Metadata } from 'next'
import Back from '@/components/back'

export const metadata: Metadata = {
  title: 'Auth | Hub Desk',
}

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <section className="flex min-h-screen">
        <div className="relative flex w-full max-w-[500px] flex-col justify-center bg-grey-gradient p-6 py-16">
          <Back
            className="absolute left-2/4 top-16 -translate-x-2/4"
            href="/"
          />
          <div className="flex w-full flex-col justify-evenly gap-y-6">
            {children}
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${Waves.src})` }}
          className="flex-1 bg-cover"
        />
      </section>
    </main>
  )
}

export default Layout

import { ReactNode } from 'react'
import Waves from '../../../public/wavesBG.png'
import Image from 'next/image'
import Logo from '../../../public/hubDesk.svg'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Link
        className="absolute left-[50%] flex h-[10vh] translate-x-[-50%] items-center"
        href={'/'}
      >
        <Image className="w-[280px]" alt="Logo" src={Logo} />
      </Link>
      <div
        className="flex h-screen items-center justify-center bg-cover px-5 pt-[10vh]"
        style={{ backgroundImage: `url(${Waves.src})` }}
      >
        {children}
      </div>
    </main>
  )
}

export default Layout

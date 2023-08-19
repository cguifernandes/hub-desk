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
    <main
      style={{ backgroundImage: `url(${Waves.src})` }}
      className="min-h-screen bg-cover p-5 pt-14"
    >
      <Link href={'/'}>
        <Image className="m-auto" width={290} alt="Logo" src={Logo} />
      </Link>
      <div className="my-14 flex items-center justify-center">{children}</div>
    </main>
  )
}

export default Layout

import Image from 'next/image'
import Logo from '../../public/hub-desk.svg'
import Button from './button'
import { IconNavBar } from './headerWrapper'

const Header = () => {
  return (
    <header className="fixed z-50 flex h-[10vh] w-full justify-center bg-grey-200 backdrop-blur">
      <div className="mx-10 flex w-full max-w-[1636px] items-center justify-between md:mx-6">
        <Image width={340} alt="Logo" quality={100} src={Logo} />
        <div className="hidden md:inline md:space-x-4">
          <Button fill="empty" text="Login" className="w-40" />
          <Button text="Registrar" className="w-40" />
        </div>
        <IconNavBar className="flex cursor-pointer md:hidden" />
      </div>
    </header>
  )
}

export default Header

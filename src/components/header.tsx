import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Button from './button'
import NavBar from './headerWrapper'

const Header = () => {
  return (
    <header className="md:bg-grey-400/60 bg-grey-400 fixed z-50 flex h-[10vh] w-full justify-center backdrop-blur">
      <div className="mx-10 flex w-full max-w-[1636px] items-center justify-between md:mx-6">
        <Image className="w-[300px] md:w-[340px]" alt="Logo" src={Logo} />
        <nav className="hidden md:inline md:space-x-4">
          <Button fill="empty" text="Login" className="w-40" />
          <Button text="Registrar" className="w-40" />
        </nav>
        <NavBar className="flex cursor-pointer md:hidden" />
      </div>
    </header>
  )
}

export default Header

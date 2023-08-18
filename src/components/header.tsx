import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Button from './button'
import NavBar from './headerWrapper'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-[10vh] w-full justify-center bg-grey-500 backdrop-blur md:bg-grey-500/60">
      <div className="mx-6 flex w-full max-w-[1636px] items-center justify-between ">
        <Image className="w-[210px] sm:w-[250px]" alt="Logo" src={Logo} />
        <nav className="hidden md:flex md:gap-x-4">
          <Button href="/sign-in" fill="empty" text="Login" className="w-40" />
          <Button href="/sign-up" text="Registrar" className="w-40" />
        </nav>
        <NavBar className="flex cursor-pointer md:hidden" />
      </div>
    </header>
  )
}

export default Header

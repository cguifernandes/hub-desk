import Image from 'next/image'
import Logo from '../../../public/hubDesk.svg'
import NavBar from './headerWrapper'
import Nav from '../User/nav'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-24 w-full justify-center bg-grey-500 backdrop-blur md:bg-grey-500/60">
      <div className="mx-6 flex w-full max-w-[1636px] items-center justify-between ">
        <Image className="w-[210px] sm:w-[250px]" alt="Logo" src={Logo} />
        <Nav />
        <NavBar className="flex cursor-pointer md:hidden" />
      </div>
    </header>
  )
}

export default Header

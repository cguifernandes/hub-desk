import NavBar from './headerWrapper'
import Nav from '../User/nav'
import Logo from '../logo'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-24 w-full justify-center bg-grey-500 backdrop-blur md:bg-grey-500/60">
      <div className="mx-6 flex w-full max-w-[1636px] items-center justify-between ">
        <Logo className="w-[230px] sm:w-[280px]" />
        <Nav />
        <NavBar className="flex cursor-pointer md:hidden" />
      </div>
    </header>
  )
}

export default Header

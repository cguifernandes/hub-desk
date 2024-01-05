import Nav from '../Client/nav'
import Back from '../back'
import Search from './search'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-20 w-full justify-center border-b-2 border-grey-400 bg-modal-gradient backdrop-blur">
      <div className="relative mx-6 flex w-full max-w-[1820px] items-center justify-between ">
        <Search />
        <Back
          href="/"
          isHeader
          className="absolute left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2"
        />
        <Nav />
      </div>
    </header>
  )
}

export default Header

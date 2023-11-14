import Nav from '../Client/nav'
import Back from '../back'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-20 w-full justify-center bg-grey-500/30 backdrop-blur">
      <div className="mx-6 flex w-full max-w-[1636px] items-center justify-between ">
        <Back href="/" isHeader className="w-[200px]" />
        <Nav />
      </div>
    </header>
  )
}

export default Header

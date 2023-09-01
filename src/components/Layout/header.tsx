import { Profile } from '@/app/server-components'
import Back from '../back'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-24 w-full justify-center bg-grey-500 backdrop-blur md:bg-grey-500/60">
      <div className="mx-6 flex w-full max-w-[1636px] items-center justify-between ">
        <Back href="/" isHeader className="w-[230px] sm:w-[280px]" />
        <Profile />
      </div>
    </header>
  )
}

export default Header

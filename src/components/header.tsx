import Image from 'next/image'
import Logo from '../../public/hub-desk.svg'
import Button from './button'

const Header = () => {
  return (
    <header className="bg-grey-200 fixed z-50 flex h-[10vh] w-full justify-center backdrop-blur">
      <div className="mx-6 flex w-full max-w-[1636px] items-center justify-between">
        <Image width={338} height={64} alt="Logo" src={Logo} />
        <div className="space-x-4">
          <Button fill="empty" text="Login" className="w-40" />
          <Button text="Registrar" className="w-40" />
        </div>
      </div>
    </header>
  )
}

export default Header

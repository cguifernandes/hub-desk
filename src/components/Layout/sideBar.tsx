'use client'
import { LogOut, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideBar = () => {
  const pathname = usePathname()

  return (
    <div className="flex w-full flex-row flex-wrap gap-6 md:flex-nowrap lg:w-3/12 lg:min-w-[280px] lg:flex-col">
      <button
        style={{
          backgroundColor: pathname.includes('account')
            ? '#333333'
            : 'transparent',
        }}
        className="w-full rounded-md border border-grey-400 text-white transition-all"
      >
        <Link
          className="flex items-center gap-x-3 p-4"
          href="/settings/account"
        >
          <UserCircle strokeWidth={1.5} size={22} />
          <div className="h-[24px] w-[2px] bg-grey-400" />
          <span>Conta</span>
        </Link>
      </button>
      <button className="flex w-full items-center gap-x-3 rounded-md border border-grey-400 p-4 text-white">
        <LogOut strokeWidth={1.5} size={22} />
        <div className="h-[24px] w-[2px] bg-grey-400" />
        <span>Sair da conta</span>
      </button>
    </div>
  )
}

export default SideBar

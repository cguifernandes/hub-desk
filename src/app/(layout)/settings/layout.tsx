import Heading from '@/components/Typography/heading'
import SideBar from '@/components/Layout/sideBar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center">
      <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
        <Heading size="lg" align="center" className="pb-6 text-white">
          Configurações
        </Heading>
      </div>
      <div className="flex w-11/12 flex-col gap-x-6 gap-y-8 border-t-2 border-grey-400 py-8 lg:flex-row xl:px-6">
        <SideBar />
        <div className="max-h-[600px] flex-1 overflow-y-auto lg:border-l-2 lg:border-grey-400 lg:pl-6">
          {children}
        </div>
      </div>
    </section>
  )
}

export default Layout

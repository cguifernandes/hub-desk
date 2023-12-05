import { ReactNode } from 'react'
import Footer from '@/components/Layout/footer'
import Header from '@/components/Layout/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurações | Hub Desk',
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-20">{children}</main>
      <Footer />
    </>
  )
}

export default Layout

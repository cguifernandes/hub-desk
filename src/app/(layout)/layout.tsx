import { ReactNode } from 'react'
import Footer from '@/components/Layout/footer'
import Header from '@/components/Layout/header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="mt-20">{children}</main>
      <Footer />
    </>
  )
}

export default Layout

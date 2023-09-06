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
      {children}
      <Footer />
    </>
  )
}

export default Layout

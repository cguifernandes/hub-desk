import { ReactNode } from 'react'
import Header from '@/components/Layout/header'
import Footer from '@/components/Layout/footer'

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

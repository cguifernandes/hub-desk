import { ReactNode } from 'react'
import Header from '@/components/Layout/header'
import Footer from '@/components/Layout/footer'
import CookiesMessage from '@/components/Layout/cookies'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <CookiesMessage />
      <Footer />
    </>
  )
}

export default Layout

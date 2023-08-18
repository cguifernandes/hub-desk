import { ReactNode } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CookiesMessage from '@/components/messages/cookies'

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

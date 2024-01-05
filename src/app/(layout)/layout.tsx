/* eslint-disable camelcase */
import { ReactNode } from 'react'
import Footer from '@/components/Layout/footer'
import Header from '@/components/Layout/header'

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

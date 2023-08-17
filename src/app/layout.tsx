import { ReactNode } from 'react'
import '@/styles/global.css'
import type { Metadata } from 'next'
import Header from '@/components/header'
import { Poppins, Montserrat } from 'next/font/google'
import Footer from '@/components/footer'
import CookiesMessage from '@/components/messages/cookies'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Home | Hub Desk',
}

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        <Header />
        {children}
        <CookiesMessage />
        <Footer />
      </body>
    </html>
  )
}

export default Layout

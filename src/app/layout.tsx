import { ReactNode } from 'react'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { Poppins, Montserrat } from 'next/font/google'

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
      <body>{children}</body>
    </html>
  )
}

export default Layout

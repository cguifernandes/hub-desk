import { ReactNode } from 'react'
import '@/styles/global.css'
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

import { ReactNode } from 'react'
import './global.css'
import { Poppins, Montserrat } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

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
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

export default Layout

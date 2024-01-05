import { ReactNode } from 'react'
import './global.css'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
})

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html className={`${poppins.variable}`}>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

export default Layout

import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="flex min-h-[calc(100vh_-_192px)] flex-col items-center bg-gradient-to-b from-grey-550 to-grey-500">
      {children}
    </section>
  )
}

export default Layout

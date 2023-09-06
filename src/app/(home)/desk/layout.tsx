'use client'
import useConnection from '@/hooks/useConnection'
import { ReactNode, useEffect } from 'react'
import { ROUTES } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import RedirectWrapper from '@/components/Layout/redirect'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { push } = useRouter()
  const { isConnected } = useConnection()

  useEffect(() => {
    if (!isConnected) {
      setTimeout(() => {
        push(ROUTES.public.signIn)
      }, 3000)
    }
  }, [isConnected, push])

  return (
    <>
      {!isConnected && (
        <main className="mt-24">
          <section className="flex min-h-[calc(100vh_-_192px)] flex-col bg-gradient-to-b from-grey-550 to-grey-500">
            <RedirectWrapper
              text="Parece que você não está cadastrado(a)!"
              subtext="Você será redirecionado para página de login."
            />
          </section>
        </main>
      )}
      {isConnected && children}
    </>
  )
}

export default Layout

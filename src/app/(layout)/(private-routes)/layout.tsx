'use client'
import { ReactNode, useEffect, useState } from 'react'
import { ROUTES } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import RedirectWrapper from '@/components/Layout/redirect'
import Loading from '@/components/loading'
import useClient from '@/hooks/useClient'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { push } = useRouter()
  const { isConnected } = useClient()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      setTimeout(() => {
        push(ROUTES.public.signIn)
      }, 3000)
    }
  }, [isConnected, push])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <section className="flex min-h-[calc(100vh_-_192px)] flex-col items-center bg-gradient-to-b from-grey-550 to-grey-500">
        {!mounted ? (
          <div className="flex h-[calc(100vh_-_192px)] items-center justify-center">
            <Loading className="h-20 w-20" />
          </div>
        ) : !isConnected ? (
          <RedirectWrapper
            text="Parece que você não está cadastrado(a)!"
            subtext="Você será redirecionado para página de login."
          />
        ) : (
          children
        )}
      </section>
    </>
  )
}

export default Layout

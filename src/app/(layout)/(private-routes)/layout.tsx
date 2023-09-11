'use client'
import useConnection from '@/hooks/useConnection'
import { ReactNode, useEffect, useState } from 'react'
import { ROUTES } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import RedirectWrapper from '@/components/Layout/redirect'
import Skeleton from '@/components/skeleton'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { push } = useRouter()
  const { isConnected } = useConnection()
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
      <section className="flex min-h-[calc(100vh_-_192px)] flex-col bg-gradient-to-b from-grey-550 to-grey-500">
        {!mounted ? (
          <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
            <div className="space-y-6">
              <div className="space-y-1 text-center">
                <Skeleton width={505} height={32} className="m-auto" />
                <Skeleton width={405} height={24} className="m-auto pt-1" />
              </div>
              <Skeleton width={505} height={256} />
            </div>
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

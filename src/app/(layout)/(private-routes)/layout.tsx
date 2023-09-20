'use client'
import { ReactNode, useEffect, useState } from 'react'
import { ROUTES } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import RedirectWrapper from '@/components/Layout/redirect'
import useClient from '@/hooks/useClient'
import Skeleton from '@/components/Layout/skeleton'

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
          <>
            <div className="flex w-[90%] flex-col items-center justify-center gap-y-1 py-16 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
              <Skeleton className="w-full" height={32} />
              <Skeleton className="w-6/12" height={20} />
            </div>
            <div className="flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 px-6 py-4">
              <Skeleton className="h-[590px] max-w-[450px] flex-1" />
            </div>
          </>
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

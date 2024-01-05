'use client'

import Alert from '@/components/Layout/alert'
import useClient from '@/hooks/useClient'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import DeskLoading from './desk/post/loading'
import SettingsLoading from './settings/account/loading'
import Skeleton from '@/components/Layout/skeleton'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Link from 'next/link'

const Layout = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useClient()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    if (pathname === '/desk/post' || pathname.includes('/desk/edit')) {
      return (
        <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center">
          <DeskLoading />
        </section>
      )
    } else if (pathname === '/settings/account') {
      return (
        <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center">
          <>
            <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
              <Skeleton className="mb-4" width={150} height={32} />
            </div>
            <div className="flex w-11/12 flex-col gap-x-6 gap-y-8 border-t-2 border-grey-400 py-8 lg:flex-row xl:px-6">
              <div className="w-56 space-y-8">
                <Skeleton className="w-full" height={58} />
                <Skeleton className="w-full" height={58} />
              </div>
              <div className="max-h-[600px] min-h-[400px] flex-1 overflow-y-auto lg:border-l-2 lg:border-grey-400 lg:pl-6">
                <SettingsLoading />
              </div>
            </div>
          </>
        </section>
      )
    }
  }

  return (
    <>
      {!isConnected ? (
        <Alert>
          <Heading size="md" align="center">
            Parece que você não está logado
          </Heading>
          <Text className="text-white/50">
            Para acessar essa página, você precisa estar logado em uma conta
            válida,{' '}
            <Link className="gradient-text" href="/auth/sign-in">
              clique aqui
            </Link>{' '}
            para fazer o login
          </Text>
        </Alert>
      ) : (
        children
      )}
    </>
  )
}

export default Layout

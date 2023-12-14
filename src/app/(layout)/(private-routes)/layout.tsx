'use client'

import Alert from '@/components/Layout/alert'
import useClient from '@/hooks/useClient'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useClient()
  return <>{isConnected ? children : <Alert />}</>
}

export default Layout

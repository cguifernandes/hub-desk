'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import RedirectWrapper from '@/components/Layout/redirect'

const Redirect = () => {
  const { push } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      push('/')
    }, 3000)
  }, [push])

  return (
    <RedirectWrapper
      text={'A autenticação foi um sucesso!'}
      subtext="Você será redirecionado"
    />
  )
}

export default Redirect

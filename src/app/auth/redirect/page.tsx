'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import RedirectWrapper from '@/components/Layout/redirect'

const Redirect = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('m')

  useEffect(() => {
    setTimeout(() => {
      push('/')
    }, 3000)
  }, [push])

  return (
    <RedirectWrapper
      text={message || 'A autenticação foi um sucesso!'}
      subtext="Você será redirecionado"
    />
  )
}

export default Redirect

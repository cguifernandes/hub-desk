'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Back from '@/components/back'
import RedirectWrapper from '@/components/Layout/redirect'
import { ROUTES } from '@/utils/constant'

const Redirect = () => {
  const { push } = useRouter()
  const pathname = useSearchParams()

  useEffect(() => {
    setTimeout(() => {
      push(ROUTES.public.home)
    }, 3000)
  }, [push])

  return (
    <>
      <Back />
      <RedirectWrapper
        text={pathname.get('m') || 'A autenticação foi um sucesso!'}
        subtext="Você será redirecionado"
      />
    </>
  )
}

export default Redirect

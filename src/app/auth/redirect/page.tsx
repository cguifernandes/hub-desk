'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Back from '@/components/back'
import RedirectWrapper from '@/components/Layout/redirect'
import { ROUTES } from '@/utils/constant'

const Redirect = () => {
  const { push } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      push(ROUTES.public.home)
    }, 3000)
  }, [push])

  return (
    <>
      <Back />
      <RedirectWrapper
        text={'A autenticação foi um sucesso!'}
        subtext="Você será redirecionado"
      />
    </>
  )
}

export default Redirect

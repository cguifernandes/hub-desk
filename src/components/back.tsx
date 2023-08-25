'use client'
import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from './skeleton'

const Back = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton margin={'auto'} height={58} width={290} />
  }

  return (
    <Link href={'/'}>
      <Image className="m-auto" width={290} alt="Logo" src={Logo} />
    </Link>
  )
}

export default Back

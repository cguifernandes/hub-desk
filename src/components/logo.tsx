'use client'
import Image from 'next/image'
import LogoImage from '../../public/hubDesk.svg'
import { useEffect, useState } from 'react'
import Skeleton from './skeleton'

type LogoProps = {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton height={58} width={290} />
  }

  return <Image className={className} width={290} alt="Logo" src={LogoImage} />
}

export default Logo

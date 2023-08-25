'use client'
import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from './skeleton'

type BackProps = {
  href?: string
  className?: string
}

const Back = ({ href, className }: BackProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton height={58} width={290} />
  }

  if (href) {
    return (
      <Link href={href}>
        <Image className="m-auto" width={290} alt="Logo" src={Logo} />
      </Link>
    )
  }

  return <Image className={className} width={290} alt="Logo" src={Logo} />
}

export default Back

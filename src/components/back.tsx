'use client'
import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from '../components/Layout/skeleton'
import clsx from 'clsx'

type BackProps = {
  isHeader?: boolean
  className?: string
  href?: string
}

const Back = ({ isHeader = false, className, href }: BackProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className={className} height={36} width={210} />
  }

  if (href) {
    return (
      <Link
        className={clsx(isHeader ? 'm-0' : 'm-auto', className)}
        href={href}
      >
        <Image quality={100} height={36} width={210} alt="Logo" src={Logo} />
      </Link>
    )
  }

  return (
    <Image
      quality={100}
      className={clsx(isHeader ? 'm-0' : 'm-auto', className)}
      height={36}
      width={210}
      alt="Logo"
      src={Logo}
    />
  )
}

export default Back

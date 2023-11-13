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
    return <Skeleton margin={isHeader ? 0 : 'auto'} height={58} width={200} />
  }

  if (href) {
    return (
      <Link href={href}>
        <Image
          className={clsx(isHeader ? 'm-0' : 'm-auto', className)}
          width={200}
          alt="Logo"
          src={Logo}
        />
      </Link>
    )
  }

  return (
    <Image
      className={clsx(isHeader ? 'm-0' : 'm-auto', className)}
      width={200}
      alt="Logo"
      src={Logo}
    />
  )
}

export default Back

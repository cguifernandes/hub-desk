'use client'
import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from './skeleton'
import clsx from 'clsx'

type BackProps = {
  isHeader?: boolean
  className?: string
}

const Back = ({ isHeader = false, className }: BackProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton margin={isHeader ? 0 : 'auto'} height={58} width={290} />
  }

  return (
    <Link href={'/'}>
      <Image
        className={clsx(isHeader ? 'm-0' : 'm-auto', className)}
        width={290}
        alt="Logo"
        src={Logo}
      />
    </Link>
  )
}

export default Back

'use client'
import Image from 'next/image'
import Logo from '../../public/hubDesk.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Back = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="m-auto h-[58px] w-[290px]  animate-pulse">
        <div className="h-full w-full rounded-md bg-grey-800" />
      </div>
    )
  }

  return (
    <Link href={'/'}>
      <Image className="m-auto" width={290} alt="Logo" src={Logo} />
    </Link>
  )
}

export default Back

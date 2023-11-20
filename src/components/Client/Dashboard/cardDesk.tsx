/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { RDeskProps } from '@/utils/type'
import Heading from '../../Typography/heading'
import Text from '../../Typography/text'
import Button from '../../button'
import clsx from 'clsx'
import { ReactNode } from 'react'
import DeskWrapper from '@/components/deskWrapper'
import { motion } from 'framer-motion'
import Link from 'next/link'

type CardDeskProps = {
  children?: ReactNode
  href?: string
  className?: string
  data: RDeskProps
}

const CardDesk = ({ children, href, data, className }: CardDeskProps) => {
  const Pattern = href ? motion(Link) : motion.div

  return (
    <Pattern
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'keyframes' }}
      href={href!}
      className={clsx(
        'flex h-[590px] flex-col justify-between rounded-md border p-7 shadow-md',
        'w-[450px] border-grey-400 bg-desk-gradient transition-colors',
        className,
      )}
    >
      {children}

      <div className="flex flex-col items-center space-y-1 text-center">
        <Heading
          className="w-8/12 overflow-hidden text-ellipsis whitespace-nowrap"
          size="md"
        >
          {data.title}
        </Heading>
        <Text className="text-white/50">{data.category}</Text>
      </div>
      <Text className="w-full break-words text-center">{data.description}</Text>
      {data.category === 'Sites' && (
        <div className="flex flex-col gap-6">
          {data.repo !== '' && (
            <Button
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              href={data.repo}
              fill="empty"
              text="Repositório"
            />
          )}
          {data.website !== '' && (
            <Button
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              href={data.website}
              text="Site"
            />
          )}
        </div>
      )}
      <DeskWrapper authorId={data.authorId} createdAt={data.createdAt} />
    </Pattern>
  )
}

export default CardDesk

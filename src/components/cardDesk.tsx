/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { DeskProps } from '@/utils/type'
import Heading from './Typography/heading'
import Text from './Typography/text'
import Button from './button'
import clsx from 'clsx'
import { ReactNode } from 'react'
import DeskWrapper from '@/components/Wrapper/deskWrapper'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CardDeskProps = {
  children?: ReactNode
  href?: string
  className?: string
  data: DeskProps
}

const CardDesk = ({ children, href, data, className }: CardDeskProps) => {
  const Pattern = href ? motion(Link) : motion.div

  // if (data.visibility === 'Público') {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'keyframes', duration: 0.4 }}
      className={clsx(
        'flex h-[640px] flex-col justify-between rounded-md border-2',
        'relative border-grey-400 bg-desk-gradient p-7 shadow-md',
        className,
      )}
    >
      {children}
      {data.image && (
        <div className="absolute left-0 top-0 h-40 w-full">
          <img
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${data.image}`}
            alt={data.title}
            className="h-full w-full overflow-clip rounded-t-md object-cover object-top align-top"
          />
          <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-grey-600"></div>
        </div>
      )}
      <Pattern
        href={href!}
        style={{ marginTop: data.image ? 120 : 0 }}
        className="z-20 flex w-full flex-col items-center space-y-1 text-center"
      >
        <Heading
          className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
          size="md"
        >
          {data.title}
        </Heading>
        <Text className="text-white/50">{data.category}</Text>
        <p>{data.visibility}</p>
      </Pattern>
      <Text className="break-words text-center">{data.description}</Text>
      {data?.category === 'Sites' &&
        (data?.repo !== '' || data?.website !== '') && (
          <div className="flex flex-col gap-6">
            {data.repo !== '' && (
              <Button
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                href={data.repo}
                fill="empty"
                text="Repositório"
                isDeskCard
              />
            )}
            {data.website !== '' && (
              <Button
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                href={data.website}
                text="Site"
                isDeskCard
              />
            )}
          </div>
        )}
      <DeskWrapper authorId={data.authorId} createdAt={data.createdAt} />
    </motion.div>
  )
  // }
}

export default CardDesk

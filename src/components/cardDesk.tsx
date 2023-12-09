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
import DeskWrapper from '@/components/deskWrapper'
import Link from 'next/link'

type CardDeskProps = {
  children?: ReactNode
  href?: string
  className?: string
  data: DeskProps
}

const CardDesk = ({ children, href, data, className }: CardDeskProps) => {
  const Pattern = href ? Link : 'div'

  return (
    <Pattern
      href={href!}
      className={clsx(
        'flex h-[640px] flex-col justify-between rounded-md border-2',
        'border-grey-400 bg-desk-gradient p-7 shadow-md',
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
      <div className="space-y-4">
        <Text className="line-clamp-3 break-words text-center">
          {data.description}
        </Text>
        {data.image && (
          <img
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${data.image}`}
            alt={data.description}
            className="h-56 w-full overflow-clip object-cover object-top align-top"
          />
        )}
      </div>
      {data.category === 'Sites' && data.repo !== '' && data.website !== '' && (
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

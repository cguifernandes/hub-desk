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

type CardDeskProps = RDeskProps & {
  children?: ReactNode
  href?: string
  className?: string
}

const CardDesk = ({
  category,
  createdAt,
  description,
  repo,
  title,
  website,
  children,
  href,
  authorId,
  className,
}: CardDeskProps) => {
  const Pattern = href ? motion(Link) : motion.div

  return (
    <Pattern
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'keyframes' }}
      href={href!}
      className={clsx(
        'flex h-[590px] min-w-[340px] flex-col justify-between border-2 p-6 shadow-md',
        'max-w-[450px] border-grey-400 transition-colors hover:bg-grey-500',
        className,
      )}
    >
      {children}

      <div className="flex flex-col items-center space-y-1 text-center">
        <Heading
          className="w-8/12 overflow-hidden text-ellipsis whitespace-nowrap"
          size="md"
        >
          {title}
        </Heading>
        <Text className="text-white/50">{category}</Text>
      </div>
      <Text className="w-full break-words text-center">{description}</Text>
      {category === 'Sites' && (
        <div className="flex flex-col gap-6">
          {repo !== '' && (
            <Button
              target="_blank"
              deskButton
              onClick={(e) => e.stopPropagation()}
              href={repo}
              fill="empty"
              text="Repositório"
            />
          )}
          {website !== '' && (
            <Button
              target="_blank"
              deskButton
              onClick={(e) => e.stopPropagation()}
              href={website}
              text="Site"
            />
          )}
        </div>
      )}
      <DeskWrapper authorId={authorId} createdAt={createdAt} />
    </Pattern>
  )
}

export default CardDesk

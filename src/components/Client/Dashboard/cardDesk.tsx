/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ClientsProps, RDeskProps } from '@/utils/type'
import Heading from '../../Typography/heading'
import Text from '../../Typography/text'
import Button from '../../button'
import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Skeleton from '@/components/skeleton'

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
  const [author, setAuthor] = useState<ClientsProps>()
  const [isLoading, setIsLoading] = useState(false)
  const formattedDate = new Date(createdAt).toLocaleDateString()
  const Pattern = href ? Link : 'div'

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/auth?id=${authorId}`, {
          cache: 'force-cache',
          method: 'GET',
        })

        const data = await response.json()

        setAuthor(data.clients[0])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getClient()
  }, [])

  return (
    <Pattern
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
      <div className="flex justify-between text-xs text-white">
        {isLoading ? (
          <Skeleton width={95} height={16} />
        ) : (
          <span className="flex items-center gap-x-1">
            Autor: {author?.name}{' '}
            <img
              className="h-4 w-4 overflow-clip rounded-full object-cover object-center align-top"
              alt="Foto de perfil do autor"
              src={author?.pfp}
            />
          </span>
        )}

        <span>Criado em: {formattedDate}</span>
      </div>
    </Pattern>
  )
}

export default CardDesk

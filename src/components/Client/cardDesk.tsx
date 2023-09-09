/* eslint-disable @next/next/no-img-element */
'use client'
import { RDeskProps, ResponseProps } from '@/utils/type'
import Heading from '../Typography/heading'
import Text from '../Typography/text'
import Button from '../button'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { api } from '@/utils/api'
import { ErrorToast, SuccessToast } from '@/utils/toast'

const CardDesk = ({
  category,
  createdAt,
  description,
  imageURL,
  repo,
  title,
  website,
  id,
  name,
}: RDeskProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDeleteDesk = async () => {
    try {
      const { data }: { data: ResponseProps } = await api.delete('desks', {
        data: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (data.error) {
        ErrorToast(data.error)
      } else {
        SuccessToast('A desk foi apagada com sucesso.')
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
      ErrorToast('Erro ao apagar a desk.')
    }
  }

  return (
    <>
      {!mounted ? (
        <p>Loading</p>
      ) : (
        <div
          className={clsx(
            'flex h-[490px] w-[360px] flex-col justify-between border-2 border-grey-400 p-6',
            'relative hover:bg-gradient-to-b hover:from-grey-550 hover:to-grey-500',
          )}
        >
          <button
            onClick={handleDeleteDesk}
            className="absolute right-4 top-4 rounded-xl p-2 transition-colors hover:bg-grey-400"
          >
            <Trash2 color="#fff" strokeWidth={1.5} />
          </button>
          <div className="flex flex-col items-center space-y-1 text-center">
            <Heading
              className="w-8/12 overflow-hidden text-ellipsis whitespace-nowrap"
              size="md"
            >
              {title}
            </Heading>
            <Text className="text-white/50">{category}</Text>
          </div>
          <img
            src={imageURL}
            alt={description}
            className="aspect-video h-36 w-full overflow-clip object-cover object-top"
          />
          <Text className="w-full break-words text-center">{description}</Text>

          {category === 'Sites' && (
            <div className="flex justify-between gap-x-6">
              <Button
                target="_blank"
                href={repo}
                className="flex-[0.5]"
                fill="empty"
                text="Repositório"
              />
              <Button
                target="_blank"
                href={website}
                className="flex-[0.5]"
                text="Site"
              />
            </div>
          )}
          <div className="flex justify-between text-xs text-white">
            <span>Autor: {name}</span>
            <span>Criado em: {formattedDate}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default CardDesk

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { RDeskProps, ResponseProps } from '@/utils/type'
import Heading from '../../Typography/heading'
import Text from '../../Typography/text'
import Button from '../../button'
import clsx from 'clsx'
import { Trash2 } from 'lucide-react'
import { api } from '@/utils/api'
import { ErrorToast } from '@/utils/toast'
import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

type CardDeskProps = RDeskProps & {
  setDesks: Dispatch<SetStateAction<RDeskProps[]>>
}

const CardDesk = ({
  category,
  createdAt,
  description,
  repo,
  title,
  website,
  id,
  name,
  setDesks,
}: CardDeskProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString()

  const handleDeleteDesk = async () => {
    try {
      const { data }: { data: ResponseProps } = await api.delete('desks', {
        data: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (data.error) {
        ErrorToast(data.error)
      } else {
        const sortedDesks = data.data
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        setDesks(sortedDesks)
      }
    } catch (err) {
      ErrorToast(`Erro ao apagar a desk. ${err}`)
    }
  }

  return (
    <Link
      href={`/desk/${id}`}
      className={clsx(
        'flex h-[590px] min-w-[340px] flex-1 flex-col justify-between border-2 p-6 shadow-md md:w-[80%]',
        'relative max-w-[450px] border-grey-400 transition-colors hover:bg-grey-500 xl:w-[390px] 2xl:w-[355px]',
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
      <Text className="w-full break-words text-center">{description}</Text>
      {category === 'Sites' && (
        <div className="flex flex-col gap-6">
          {repo !== '' && (
            <Button
              target="_blank"
              href={repo}
              className="w-full"
              fill="empty"
              text="Repositório"
            />
          )}
          {website !== '' && (
            <Button
              target="_blank"
              href={website}
              className="w-full"
              text="Site"
            />
          )}
        </div>
      )}
      <div className="flex justify-between text-xs text-white">
        <span>Autor: {name}</span>
        <span>Criado em: {formattedDate}</span>
      </div>
    </Link>
  )
}

export default CardDesk

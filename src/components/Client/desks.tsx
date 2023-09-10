/* eslint-disable camelcase */
'use client'
import useConnection from '@/hooks/useConnection'
import CardDesk from './cardDesk'
import clsx from 'clsx'
import Heading from '../Typography/heading'
import { Player } from '@lottiefiles/react-lottie-player'
import EmptyAnimation from '../../../public/emptyAnimation.json'
import Link from 'next/link'
import Text from '../Typography/text'
import Skeleton from '../skeleton'
import Pagination from '../pagination'

const Desks = () => {
  const { desks, client, isLoading, totalPages, setCurrentPage, setDesks } =
    useConnection()
  const name = client.map((client) => client.name)

  return (
    <>
      {desks.length === 0 && !isLoading ? (
        <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
          <div className="space-y-6">
            <div className="space-y-1 text-center">
              <Heading size="lg" className="text-white">
                Você não tem nenhuma Desk
              </Heading>
              <Text>
                <Link
                  href={'/desk'}
                  className="text-sky-600 transition-colors hover:text-sky-700"
                >
                  Clique aqui
                </Link>{' '}
                para criar uma nova desk
              </Text>
            </div>
            <Player
              src={EmptyAnimation}
              autoplay
              keepLastFrame
              className="w-96"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
            <Heading size="lg" align="center" className="text-white">
              Bem-vindo(a) às suas Desks
            </Heading>
          </div>
          <div
            className={clsx(
              'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 p-10',
            )}
          >
            {isLoading ? (
              <>
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
                <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              </>
            ) : (
              desks.map((desk) => (
                <CardDesk
                  setDesks={setDesks}
                  key={desk.id}
                  category={desk.category}
                  createdAt={desk.createdAt}
                  description={desk.description}
                  imageURL={desk.imageURL}
                  repo={desk.repo}
                  title={desk.title}
                  website={desk.website}
                  id={desk.id}
                  name={name}
                />
              ))
            )}
          </div>
        </>
      )}
      {desks.length > 0 && !isLoading && (
        <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} />
      )}
    </>
  )
}

export default Desks

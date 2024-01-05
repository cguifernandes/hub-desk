/* eslint-disable @next/next/no-img-element */
'use client'
import Heading from './Typography/heading'
import Text from './Typography/text'
import Link from 'next/link'
import ClientWrapper from './Wrapper/clientWrapper'
import Skeleton from './Layout/skeleton'
import { RSearchProps } from '@/utils/type'
import SearchWrapper from './Wrapper/searchWrapper'

type DropSearchProps = {
  query: string
  isLoading: boolean
  response: RSearchProps | undefined
  handlerClickOverlay: () => void
}

const DropSearch = ({
  isLoading,
  query,
  response,
  handlerClickOverlay,
}: DropSearchProps) => {
  return (
    <>
      {query !== '' ? (
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton height={28} width={90} />
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex min-h-[130px] max-w-full rounded-md px-3 py-2"
                >
                  {index !== 3 && (
                    <Skeleton height={114} className="mr-3 min-w-[80px]" />
                  )}
                  <div className="flex max-w-full flex-col justify-between gap-y-3 py-2">
                    <div className="space-y-px">
                      <Skeleton className="w-[220px] max-w-full" height={28} />
                      <Skeleton className="w-[290px] max-w-full" height={20} />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Skeleton className="w-[90px] max-w-full" height={20} />
                      <Skeleton className="w-[150px] max-w-full" height={20} />
                    </div>
                  </div>
                </div>
              ))}
              <Skeleton height={28} width={110} />
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-20 w-full items-center px-3 py-2"
                >
                  <Skeleton isRoundedFull className="mr-3 h-16 w-16" />
                  <div className="flex h-full flex-col justify-center gap-y-2 py-1">
                    <Skeleton className="w-[220px] max-w-full" height={28} />
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Skeleton className="w-[90px] max-w-full" height={20} />
                      <Skeleton className="w-[150px] max-w-full" height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Heading className="text-xl">Desks</Heading>
                {response?.desks && response?.desks.length > 0 ? (
                  response?.desks.map((desk) => (
                    <div
                      key={desk.id}
                      className="flex min-h-[130px] max-w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                      onClick={handlerClickOverlay}
                    >
                      {desk.image && (
                        <img
                          className="mr-3 w-16 rounded-md object-cover sm:w-20"
                          src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk.image}`}
                          alt={desk.title}
                        />
                      )}
                      <div className="flex max-w-full flex-col justify-between gap-y-3 py-2">
                        <Link href={`/desk/${desk.id}`} className="space-y-px">
                          <div className="flex items-center break-all">
                            <Heading className="line-clamp-1 text-lg">
                              {desk?.title}{' '}
                              <span className="text-sm text-white/50">
                                ({desk.visibility})
                              </span>
                            </Heading>
                          </div>
                          <Text
                            size="sm"
                            className="line-clamp-2 text-white/50"
                          >
                            {desk.description}
                          </Text>
                        </Link>
                        <SearchWrapper
                          author={desk.author}
                          createdAt={desk.createdAt}
                          comments={desk._count?.comments}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <Text className="!mt-0 text-white/50">
                    Não há nenhuma desk com esse título
                  </Text>
                )}
              </div>
              <div className="space-y-2">
                <Heading className="text-xl">Usuários</Heading>
                {response?.clients && response?.clients.length > 0 ? (
                  response?.clients.map((client) => (
                    <Link
                      href={`/profile/${client.user}`}
                      onClick={handlerClickOverlay}
                      key={client.id}
                      className="flex h-24 w-full items-center rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                    >
                      <img
                        src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client.pfp}`}
                        alt={client.user}
                        className="mr-3 h-16 w-16 overflow-clip rounded-full object-cover object-center align-top"
                      />
                      <div className="flex h-full flex-col justify-center gap-y-2 py-1">
                        <Heading className="line-clamp-1 break-all text-lg">
                          {client.user}
                        </Heading>
                        <ClientWrapper
                          count={client._count?.desks}
                          createdAt={client.createdAt}
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  <Heading className="!mt-0 text-white/50">
                    Não há nenhuma usuário com esse nome
                  </Heading>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <Heading className="text-lg">Pesquise por desks ou usuários.</Heading>
      )}
    </>
  )
}

export default DropSearch

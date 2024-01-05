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
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  width={index === 0 ? 140 : '100%'}
                  height={index === 0 ? 28 : 80}
                />
              ))}
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Heading className="text-xl">Desks</Heading>
                {response?.desks && response?.desks.length > 0 ? (
                  response?.desks.map((desk) => (
                    <div
                      key={desk.id}
                      className="flex max-h-[140px] min-h-[130px] max-w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                      onClick={handlerClickOverlay}
                    >
                      {desk.image && (
                        <img
                          className="mr-3 w-20 rounded-md object-cover"
                          src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk.image}`}
                          alt={desk.title}
                        />
                      )}
                      <div className="flex max-w-full flex-col justify-between gap-y-3 py-2">
                        <Link
                          href={`/desk/${desk.id}`}
                          style={{ maxWidth: desk.image ? 439 : 531 }}
                          className="space-y-px"
                        >
                          <div className="flex items-center">
                            <Heading className="truncate text-lg">
                              {desk?.title}{' '}
                            </Heading>
                            <span className="ml-1 text-sm text-white/50">
                              ({desk.visibility})
                            </span>
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
                      className="flex h-20 w-full items-center rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                    >
                      <img
                        src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client.pfp}`}
                        alt={client.user}
                        className="mr-3 h-14 w-14 overflow-clip rounded-full object-cover object-center align-top"
                      />
                      <div className="flex flex-col justify-center gap-y-1">
                        <Heading className="text-lg">{client.user}</Heading>
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

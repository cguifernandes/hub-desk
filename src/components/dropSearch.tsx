/* eslint-disable @next/next/no-img-element */
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
}

const DropSearch = ({ isLoading, query, response }: DropSearchProps) => {
  return (
    <>
      {query !== '' ? (
        <div className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton width={140} height={28} />
              <Skeleton className="w-full" height={128} />
              <Skeleton className="w-full" height={128} />
              <Skeleton className="w-full" height={128} />
              <Skeleton className="w-full" height={128} />
              <Skeleton className="w-full" height={128} />
              <Skeleton width={140} height={28} />
              <Skeleton className="w-full" height={80} />
              <Skeleton className="w-full" height={80} />
              <Skeleton className="w-full" height={80} />
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
                    >
                      {desk.image && (
                        <img
                          className="mr-3 w-20 rounded-md object-cover"
                          src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk.image}`}
                          alt={desk.title}
                        />
                      )}
                      <div className="flex flex-col justify-between gap-y-3 py-2">
                        <Link
                          href={`/desk/${desk.id}`}
                          style={{ maxWidth: desk.image ? 439 : 531 }}
                          className="space-y-px"
                        >
                          <Heading className="line-clamp-1 text-lg">
                            {desk.title}
                          </Heading>
                          <Text
                            size="sm"
                            className="truncate whitespace-nowrap text-white/50"
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
                  <Text className="text-white/50">
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
                  <Heading className="text-white/50">
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

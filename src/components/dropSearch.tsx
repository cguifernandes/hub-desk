/* eslint-disable @next/next/no-img-element */
import Heading from './Typography/heading'
import Text from './Typography/text'
import DeskWrapper from './Wrapper/deskWrapper'
import Link from 'next/link'
import ClientWrapper from './Wrapper/clientWrapper'
import Skeleton from './Layout/skeleton'
import { RSearchProps } from '@/utils/type'

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
                      className="flex max-h-[140px] min-h-[130px] w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                    >
                      {desk.image && (
                        <img
                          className="mr-3 w-20 rounded-md object-cover"
                          src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk.image}`}
                          alt={desk.title}
                        />
                      )}
                      <div className="flex flex-col justify-between gap-y-3 py-2">
                        <Link href={`/desk/${desk.id}`} className="space-y-px">
                          <Heading className="line-clamp-1 text-lg">
                            {desk.title}
                          </Heading>
                          <Text
                            size="sm"
                            className="line-clamp-2 break-words text-white/50"
                          >
                            {desk.description}
                          </Text>
                        </Link>
                        <DeskWrapper
                          authorId={desk.authorId}
                          createdAt={desk.createdAt}
                          searchDesk
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
                    <div
                      key={client.id}
                      className="flex h-24 w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                    >
                      <img
                        src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client.pfp}`}
                        alt={client.user}
                        className="mr-3 h-full w-20 overflow-clip rounded-full object-cover object-center align-top"
                      />
                      <div className="flex flex-col justify-between py-2">
                        <a href={`/profile/${client.user}`}>
                          <Heading className="text-lg">{client.user}</Heading>
                        </a>
                        <ClientWrapper
                          authorId={client.id}
                          createdAt={client.createdAt}
                        />
                      </div>
                    </div>
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

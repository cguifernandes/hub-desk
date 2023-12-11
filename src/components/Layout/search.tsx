/* eslint-disable @next/next/no-img-element */
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'
import Heading from '../Typography/heading'
import Text from '../Typography/text'
import AnimationWrapper from '../animationWrapper'
import { useIsLarge, useIsMedium } from '@/hooks/useMediaQuery'
import { api } from '@/utils/api'
import { RSearchProps } from '@/utils/type'
import DeskWrapper from '../deskWrapper'
import Link from 'next/link'
import ClientWrapper from '../clientWrapper'
import Skeleton from './skeleton'

const Search = () => {
  const [isVisibleSearch, setIsVisibleSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<RSearchProps>()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const isLarge = useIsLarge()
  const isMedium = useIsMedium()

  const handlerSearch = async (query: string) => {
    setQuery(query)

    if (query !== '') {
      try {
        setIsLoading(true)
        const { data } = await api.get(`/search?q=${query}`, {
          headers: { 'Content-Type': 'application/json' },
        })

        if (data.error) {
          setError(data.error)
        } else {
          setResponse(data)
        }
      } catch (err) {
        console.error('Erro ao processar formulário:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handlerClickOverlay = () => {
    setIsVisibleSearch(false)
    setQuery('')
  }

  return (
    <>
      <motion.div
        onClick={() => setIsVisibleSearch(true)}
        animate={isVisibleSearch ? 'visible' : 'hidden'}
        variants={{
          visible: {
            width: isLarge ? 600 : '95%',
            right: isLarge ? 0 : '50%',
            transform: isLarge ? 'translate(0px)' : 'translate(50%, 0%)',
            marginRight: isLarge ? 0 : 0,
          },
          hidden: {
            width: isLarge ? 380 : isMedium ? '30%' : '0%',
            marginRight: isLarge ? 0 : 92,
          },
        }}
        className="absolute right-0 z-20 flex h-[41px] min-w-[54px] items-center justify-between rounded-md bg-grey-500 px-4 py-2 md:h-auto md:min-w-[240px] lg:relative lg:m-0"
      >
        <input
          type="text"
          placeholder="Pesquise aqui..."
          className="absolute h-full w-[calc(100%_-_36px)] bg-transparent text-white placeholder-white/50 md:static"
          onChange={(e) => handlerSearch(e.target.value)}
          value={query}
        />
        <SearchIcon
          className="absolute right-4 z-[5] bg-grey-500"
          color="#fff"
          size={22}
          strokeWidth={1.5}
        />
        <AnimatePresence>
          {isVisibleSearch && (
            <AnimationWrapper
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              className="absolute left-0 top-14 h-96 w-full overflow-y-auto rounded-md bg-modal-gradient p-4 backdrop-blur-md"
            >
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
                        <Heading className="text-xl">Desks encontradas</Heading>
                        {response?.desks && response?.desks.length > 0 ? (
                          response?.desks.map((desk) => (
                            <Link
                              key={desk.id}
                              href={`/desk/${desk.id}`}
                              className="flex h-32 w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                            >
                              {desk.image && (
                                <img
                                  className="mr-3 w-20 rounded-md object-cover"
                                  src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk.image}`}
                                  alt={desk.title}
                                />
                              )}
                              <div className="flex flex-col justify-between py-2">
                                <div className="space-y-px">
                                  <Heading className="text-lg">
                                    {desk.title}
                                  </Heading>
                                  <Text size="sm" className="text-white/50">
                                    {desk.description}
                                  </Text>
                                </div>
                                <DeskWrapper
                                  authorId={desk.authorId}
                                  createdAt={desk.createdAt}
                                  searchDesk
                                />
                              </div>
                            </Link>
                          ))
                        ) : (
                          <Text className="text-white/50">
                            Não há nenhuma desk com esse título
                          </Text>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Heading className="text-xl">
                          Usuários encontradas
                        </Heading>
                        {response?.clients && response?.clients.length > 0 ? (
                          response?.clients.map((client) => (
                            <Link
                              key={client.id}
                              className="flex h-20 w-full rounded-md px-3 py-2 transition-all hover:bg-grey-500"
                              href={`/profile/${client.user}`}
                            >
                              <img
                                src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${client.pfp}`}
                                alt={client.user}
                                className="mr-3 h-full w-16 overflow-clip rounded-full object-cover object-center align-top"
                              />
                              <div className="flex flex-col justify-between py-1">
                                <div className="space-y-px">
                                  <Heading className="text-lg">
                                    {client.user}
                                  </Heading>
                                </div>
                                <ClientWrapper
                                  authorId={client.id}
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
              ) : error ? (
                <Heading className="text-lg">{error}</Heading>
              ) : (
                <Heading className="text-lg">
                  Pesquise por desks ou usuários.
                </Heading>
              )}
            </AnimationWrapper>
          )}
        </AnimatePresence>
      </motion.div>
      {isVisibleSearch && (
        <div
          onClick={handlerClickOverlay}
          className="fixed left-0 top-0 z-10 h-screen w-screen bg-grey-900/40 lg:bg-transparent"
        />
      )}
    </>
  )
}

export default Search

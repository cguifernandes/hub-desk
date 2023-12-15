/* eslint-disable @next/next/no-img-element */
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'
import AnimationWrapper from '../Wrapper/animationWrapper'
import { useIsLarge, useIsMedium } from '@/hooks/useMediaQuery'
import { RSearchProps } from '@/utils/type'
import DropSearch from '../dropSearch'
import clsx from 'clsx'

const Search = () => {
  const [isVisibleSearch, setIsVisibleSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<RSearchProps>()
  const [query, setQuery] = useState('')
  const isLarge = useIsLarge()
  const isMedium = useIsMedium()

  const handlerSearch = async (query: string) => {
    setQuery(query)

    if (query !== '') {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/search?q=${query}`, {
          cache: 'no-cache',
          method: 'GET',
        })

        const data = await response.json()
        setResponse(data)
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
        className={clsx(
          'absolute right-0 z-20 flex h-[41px] min-w-[54px] items-center justify-between rounded-md',
          'bg-grey-500 px-4 py-2 md:h-auto md:min-w-[240px] lg:relative lg:m-0',
        )}
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
              <DropSearch
                isLoading={isLoading}
                query={query}
                response={response}
              />
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

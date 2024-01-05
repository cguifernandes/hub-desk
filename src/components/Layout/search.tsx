/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
'use client'
import { motion } from 'framer-motion'
import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useIsLarge, useIsXL } from '@/hooks/useMediaQuery'
import { RSearchProps } from '@/utils/type'
import DropSearch from '../dropSearch'
import clsx from 'clsx'
import useClient from '@/hooks/useClient'
import Skeleton from './skeleton'

const Search = () => {
  const [isVisibleSearch, setIsVisibleSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<RSearchProps>()
  const { user_session } = useClient()
  const [query, setQuery] = useState('')
  const isLarge = useIsLarge()
  const isXL = useIsXL()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlerSearch = async (query: string) => {
    setQuery(query)

    if (query !== '') {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/search?q=${query}&id=${user_session}`,
          {
            cache: 'no-cache',
            method: 'GET',
          },
        )

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

  if (!mounted) {
    return <Skeleton width={52} height={40} />
  }

  return (
    <>
      <motion.div
        variants={{
          visible: {
            width: isLarge ? (isXL ? 420 : 300) : '98%',
            left: isLarge ? 0 : '50%',
            marginLeft: 0,
          },
          hidden: {
            width: isLarge ? 52 : '0%',
            left: isLarge ? 0 : '0%',
            marginLeft: isLarge ? 0 : 24,
          },
        }}
        onClick={() => setIsVisibleSearch(true)}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        animate={isVisibleSearch ? 'visible' : 'hidden'}
        className={clsx(
          'absolute z-20 flex h-10 min-w-[52px] -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0',
          'items-center justify-between rounded-md bg-grey-500 px-4 py-3',
        )}
      >
        <motion.input
          type="text"
          placeholder="Pesquise aqui..."
          variants={{
            visible: {
              opacity: 1,
            },
            hidden: {
              opacity: 0,
            },
          }}
          transition={{ type: 'keyframes', duration: 0.1 }}
          className="w-[calc(100%_-_36px)] bg-transparent text-white placeholder-white/50"
          onChange={(e) => handlerSearch(e.target.value)}
          value={query}
        />
        <SearchIcon size={20} color="#fff" strokeWidth={1.5} />
        {isVisibleSearch && (
          <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: 'keyframes', duration: 0.3, delay: 0.25 }}
            className="absolute left-0 top-14 h-96 w-full overflow-y-auto rounded-md bg-modal-gradient p-4 backdrop-blur-md lg:w-[490px]"
          >
            <DropSearch
              isLoading={isLoading}
              query={query}
              response={response}
              handlerClickOverlay={handlerClickOverlay}
            />
          </motion.div>
        )}
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

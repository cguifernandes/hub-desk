/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { api } from '@/utils/api'
import { ClientsProps, RDeskProps, ResponseProps } from '@/utils/type'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

const useConnection = () => {
  const { user_session } = parseCookies()
  const [client, setClient] = useState<ClientsProps[]>([])
  const [desks, setDesks] = useState<RDeskProps[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const ITEMS_PER_PAGE = 12
  const totalPages = Math.ceil(desks.length / ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const isConnected = !!user_session
  const name = client.map((client) => client.name)

  useEffect(() => {
    const getDesks = async () => {
      if (isConnected) {
        try {
          setIsLoading(true)
          const { data }: { data: ResponseProps } = await api.get(
            `/desks?id=${user_session}`,
          )

          const sortedDesks = data.data.slice().sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })

          setDesks(sortedDesks)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    getDesks()
  }, [])

  useEffect(() => {
    const getClient = async () => {
      if (isConnected) {
        try {
          setIsLoading(true)
          const { data }: { data: ResponseProps } = await api.get(
            `/auth?id=${user_session}`,
          )

          setClient(data.clients)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    getClient()
  }, [])

  const getCurrentPageItems = () => {
    const startIndex = currentPage * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return desks.slice(startIndex, endIndex)
  }

  return {
    isConnected,
    user_session,
    client,
    isLoading,
    desks: getCurrentPageItems(),
    setCurrentPage,
    totalPages,
    setDesks,
    name,
  }
}

export default useConnection

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { api } from '@/utils/api'
import { ClientsProps, ResponseProps } from '@/utils/type'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

const useConnection = () => {
  const { user_session } = parseCookies()
  const [client, setClient] = useState<ClientsProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const isConnected = !!user_session

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

  return { isConnected, user_session, client, isLoading }
}

export default useConnection

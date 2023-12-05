/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { ClientsProps, ResponseProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import useClient from './useClient'

const useConnection = () => {
  const [client, setClient] = useState<ClientsProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected, user_session } = useClient()
  const name = client.map((client) => client.user)

  useEffect(() => {
    const getClient = async () => {
      if (isConnected) {
        try {
          setIsLoading(true)
          const response = await fetch(`/api/auth?id=${user_session}`, {
            cache: 'no-cache',
          })

          const data: ResponseProps = await response.json()
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

  return { name, isLoading, client }
}

export default useConnection

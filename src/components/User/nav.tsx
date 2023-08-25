/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
'use client'
import useConnection from '@/hooks/useConnection'
import Button from '../button'
import { useEffect, useState } from 'react'
import { ResponseProps, ClientsProps } from '@/utils/type'
import { api } from '@/utils/api'
import Skeleton from '../skeleton'
import { destroyCookie } from 'nookies'

const Nav = () => {
  const { user_session, isConnected } = useConnection()
  const [client, setClient] = useState<ClientsProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handlerDestroyCookies = () => {
    destroyCookie(null, 'user_session')
  }

  useEffect(() => {
    const getClient = async () => {
      if (isConnected) {
        try {
          setIsLoading(true)
          const { data }: { data: ResponseProps } = await api.get(
            `/clients?id=${user_session}`,
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

  return (
    <nav className="hidden md:flex md:gap-x-4">
      {isLoading ? (
        <Skeleton height={36} width={36} className="!rounded-full" />
      ) : client.length > 0 ? (
        client.map((client) => {
          return (
            <button onClick={() => handlerDestroyCookies()} key={client.id}>
              <img
                alt={client.name}
                src={client.pfp}
                className="h-9 w-9 rounded-full"
              />
            </button>
          )
        })
      ) : (
        <>
          <Button
            href="auth/sign-in"
            fill="empty"
            text="Login"
            className="w-40"
          />
          <Button href="auth/sign-up" text="Registrar" className="w-40" />
        </>
      )}
    </nav>
  )
}

export default Nav

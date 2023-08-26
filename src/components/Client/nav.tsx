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
import ModalBar from './modal'

const Nav = () => {
  const { user_session, isConnected } = useConnection()
  const [client, setClient] = useState<ClientsProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
    <>
      {isLoading ? (
        <Skeleton height={36} width={36} className="!rounded-full" />
      ) : client.length > 0 ? (
        client.map((client) => {
          return (
            <ModalBar
              email={client.email}
              password={client.password}
              id={client.id}
              name={client.name}
              pfp={client.pfp}
              key={client.id}
            />
          )
        })
      ) : (
        <div>
          <Button
            href="auth/sign-in"
            fill="empty"
            text="Login"
            className="w-40"
          />
          <Button href="auth/sign-up" text="Registrar" className="w-40" />
        </div>
      )}
    </>
  )
}

export default Nav

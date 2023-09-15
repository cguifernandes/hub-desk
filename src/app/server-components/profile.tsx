/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
import { url } from '@/utils/constant'
import { ResponseProps } from '@/utils/type'
import { cookies } from 'next/headers'

export async function getServerSideProps({
  user_session,
}: {
  user_session: string | undefined
}) {
  if (!user_session) return

  const response = await fetch(`${url}/api/auth?id=${user_session}`, {
    cache: 'no-cache',
  })

  return (await response.json()) as ResponseProps | undefined
}

export const PFP = async () => {
  const user_session = cookies().get('user_session')?.value
  const data = await getServerSideProps({ user_session })

  return (
    <>
      {data?.clients.map((client) => (
        <img
          key={client.password}
          alt={client.name}
          src={client.pfp}
          className="h-11 w-11 overflow-clip rounded-full object-cover object-center align-top"
        />
      ))}
    </>
  )
}

export const revalidate = 5

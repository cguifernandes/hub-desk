/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../button'
import Search from '../Layout/search'
import { cookies } from 'next/headers'
import { url } from '@/utils/constant'
import { ClientsProps } from '@/utils/type'
import Pfp from './pfp'

async function getServerSideProps(user_session: string | undefined) {
  if (user_session === undefined) {
    return {
      props: {
        client: [],
      },
    }
  }

  const response = await fetch(`${url}/api/auth?id=${user_session}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-cache',
  })

  const { clients } = await response.json()

  return {
    props: {
      client: clients as ClientsProps[],
    },
  }
}

const Nav = async () => {
  const cookieStore = cookies()
  const user_session = cookieStore.get('user_session')
  const { props } = (await getServerSideProps(user_session?.value)) as {
    props: { client: ClientsProps[] }
  }

  return (
    <div className="flex items-center gap-x-6">
      {user_session ? (
        <>
          <Search />
          <Pfp client={props.client} user_session={user_session} />
        </>
      ) : (
        <nav className="hidden gap-x-5 md:flex">
          <Button
            href="/auth/sign-in"
            fill="empty"
            text="Login"
            className="w-36"
          />
          <Button href="/auth/sign-up" text="Registrar" className="w-36" />
          <Pfp client={props.client} user_session={user_session} />
        </nav>
      )}
    </div>
  )
}

export default Nav

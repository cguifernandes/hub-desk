/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
import AccountWrapper from '@/components/accountWrapper'
import { url } from '@/utils/constant'
import { ClientsProps } from '@/utils/type'
import { cookies } from 'next/headers'

async function getServerSideProps() {
  const headers = cookies()
  const user_session = headers.get('user_session')
  const isConnected = headers.has('user_session')
  if (!isConnected) {
    return {
      props: {
        client: [],
      },
    }
  }

  const response = await fetch(
    `${url}/api/auth/getWithId?id=${user_session?.value}`,
    {
      headers: { 'Content-Type': 'application/json' },
      cache: 'reload',
    },
  )

  const { clients } = await response.json()

  return {
    props: {
      client: clients as ClientsProps[],
    },
  }
}

const Account = async () => {
  const { props } = (await getServerSideProps()) as {
    props: { client: ClientsProps[] }
  }

  return <AccountWrapper client={props.client} />
}

export default Account

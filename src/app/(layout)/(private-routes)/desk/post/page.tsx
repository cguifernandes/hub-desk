/* eslint-disable camelcase */
import FormDesk from '@/components/Form/Desk/formDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { url } from '@/utils/constant'
import { ClientsProps } from '@/utils/type'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Criar uma desk | Hub Desk',
}

async function getServerSideProps() {
  const headers = cookies()
  const user_session = headers.get('user_session')

  const response = await fetch(
    `${url}/api/auth/getWithId?id=${user_session?.value}`,
    {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    },
  )

  const { data } = await response.json()

  return {
    props: {
      client: data as ClientsProps[],
    },
  }
}

const Desk = async () => {
  const { props } = (await getServerSideProps()) as {
    props: { client: ClientsProps[] }
  }

  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_100px)] flex-col items-center py-8 md:min-h-[calc(100vh_-_80px_-_64px)] lg:py-10">
      <div className="w-full px-8 pb-4 text-center lg:px-10 lg:pb-6">
        <Heading className="text-xl">
          Crie uma desk para que você possa discutir sua opinião com a
          comunidade
        </Heading>
        <Text className="text-white/50">Campos com “*” são obrigatórios</Text>
      </div>
      <FormDesk author={props.client[0]} />
    </section>
  )
}

export default Desk

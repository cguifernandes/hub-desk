/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import Heading from '@/components/Typography/heading'
import Desks from '@/components/Layout/desks'
import { url } from '@/utils/constant'
import { RClientsProps, RDeskProps } from '@/utils/type'
import { Metadata } from 'next'
import Alert from '@/components/Layout/alert'
import Text from '@/components/Typography/text'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${url}/api/auth/getWithUser?user=${params.slug}`,
  )
  const data = await response.json()

  return {
    title: `Perfil | ${
      data.success ? data.data[0].user : 'Perfil não encontrado'
    }`,
  }
}

async function getServerSideProps(user: string | undefined) {
  if (!user) return

  const clientResponse = await fetch(
    `${url}/api/auth/getWithUser?user=${user}`,
    {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    },
  )

  const data = await clientResponse.json()

  if (data?.success) {
    const desksResponse = await fetch(
      `${url}/api/desks/getWithAuthorId?id=${data.data[0].id}`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      },
    )

    const desks = await desksResponse.json()

    return {
      props: {
        client: data as RClientsProps,
        desk: desks as RDeskProps,
      },
    }
  } else {
    return {
      props: {
        client: data,
        desk: [],
      },
    }
  }
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { props } = (await getServerSideProps(params.slug)) as {
    props: { client: RClientsProps; desk: RDeskProps }
  }

  if (props.client.success) {
    const formattedDate = new Date(
      props.client.data[0].createdAt,
    ).toLocaleDateString()

    return (
      <section className="flex min-h-[calc(100vh_-_80px_-_100px)] flex-col items-center md:min-h-[calc(100vh_-_80px_-_64px)]">
        <div className="relative h-[calc(240px_+_252px_-_80px)] w-full md:h-[calc(240px_+_192px_-_96px)]">
          <div className="absolute left-0 top-0 h-60 w-full">
            <img
              className="h-full w-full overflow-clip object-cover object-center align-top"
              src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${props.client.data[0]?.bg}`}
              alt={props.client.data[0].user}
            />
            <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-grey-700" />
          </div>
          <div className="absolute bottom-0 flex w-full flex-col items-center justify-center px-6 md:flex-row md:items-end md:justify-between md:px-10">
            <img
              className="mb-3 h-40 w-40 overflow-clip rounded-full object-cover object-center shadow-md md:mb-0 md:h-48 md:w-48"
              src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${props.client.data[0].pfp}`}
              alt={props.client.data[0].user}
            />
            <div className="flex w-full items-center justify-center md:flex-1 md:justify-between md:pl-4">
              <div className="flex flex-col text-center md:text-left">
                <Heading size="lg" className="mb-2 font-medium">
                  {props.client.data[0].user}
                </Heading>
                <span className="text-sm text-white/50">
                  Membro desde {formattedDate}
                </span>
                <span className="text-sm text-white/50">
                  Há um total de {props.desk.count} desks criadas
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-16 flex h-full w-full flex-col">
          <Desks
            deskCount={props.desk.count}
            user={props.client.data[0].user}
            id={props.client.data[0].id}
          />
        </div>
      </section>
    )
  } else {
    return (
      <Alert>
        <Heading size="md" align="center">
          Perfil não encontrado
        </Heading>
        <Text className="text-center text-white/50">
          Parece que você acessou uma página que não existe,{' '}
          <Link className="gradient-text" href="/">
            clique aqui
          </Link>{' '}
          para voltar para a página &#34;Home&#34;
        </Text>
      </Alert>
    )
  }
}

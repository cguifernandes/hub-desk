/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Desks from '@/components/Layout/desks'
import { url } from '@/utils/constant'
import { ClientsProps, RDeskProps } from '@/utils/type'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${url}/api/auth/getWithUser?user=${params.slug}`,
  )
  const { clients } = await response.json()

  return {
    title: `Perfil | ${clients[0]?.user}`,
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

  const { clients } = await clientResponse.json()

  const desksResponse = await fetch(
    `${url}/api/desks/getWithAuthorId?id=${clients[0].id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    },
  )

  const desks = await desksResponse.json()

  return {
    props: {
      client: clients as ClientsProps[],
      desk: desks as RDeskProps,
    },
  }
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { props } = (await getServerSideProps(params.slug)) as {
    props: { client: ClientsProps[]; desk: RDeskProps }
  }
  const formattedDate = new Date(props.client[0].createdAt).toLocaleDateString()

  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center">
      <div className="relative h-[calc(240px_+_252px_-_80px)] w-full md:h-[calc(240px_+_192px_-_96px)]">
        <img
          className="h-60 w-full object-cover"
          src="https://cdn.awsli.com.br/600x450/549/549871/produto/29108664/35ddc56731.jpg"
          alt="Foto de fundo"
        />
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center px-6 md:flex-row md:items-end md:justify-between md:px-10">
          <img
            className="mb-3 h-40 w-40 overflow-clip rounded-full object-cover object-center shadow-md md:mb-0 md:h-48 md:w-48"
            src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${props.client[0].pfp}`}
            alt={props.client[0].user}
          />
          <div className="flex w-full items-center justify-center md:flex-1 md:justify-between md:pl-4">
            <div className="flex flex-col text-center md:text-left">
              <Heading size="lg" className="mb-2 font-medium">
                {props.client[0].user}
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
        <div className="w-full text-center">
          <Heading size="lg">Desks</Heading>
          <Text className="text-white/50">
            Desks criadas por {props.client[0].user}
          </Text>
        </div>
        <Desks user={props.client[0].user} id={props.client[0].id} />
      </div>
    </section>
  )
}

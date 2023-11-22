/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import Heading from '@/components/Typography/heading'
import { url } from '@/utils/constant'
import { ClientsProps } from '@/utils/type'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${url}/api/auth/getWithName?name=${params.slug}`,
  )
  const { clients } = await response.json()

  return {
    title: `Perfil | ${clients[0]?.name}`,
  }
}

async function getServerSideProps(name: string | undefined) {
  if (!name) return

  const response = await fetch(`${url}/api/auth/getWithName?name=${name}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'reload',
  })

  return await response.json()
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { clients }: { clients: ClientsProps[] } = await getServerSideProps(
    params.slug,
  )

  console.log(clients[0])

  return (
    <section className="flex min-h-[calc(100vh_-_176px)] flex-col items-center">
      <img
        className="h-48 w-48 rounded-full"
        src={clients[0].pfp}
        alt={clients[0].name}
      />
      <Heading className="font-medium">{clients[0].name}</Heading>
      <span>{}</span>
    </section>
  )
}

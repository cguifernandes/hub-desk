/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import CardDesk from '@/components/Client/Dashboard/cardDesk'
import Heading from '@/components/Typography/heading'
import Skeleton from '@/components/skeleton'
import { RDeskProps } from '@/utils/type'
import { Metadata } from 'next'
import { Suspense } from 'react'

const url =
  process?.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://hub-desk.vercel.app'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(`${url}/api/desks/getUnique?id=${params.slug}`)
  const { data } = await response.json()

  return {
    title: `Paquetá | ${data[0]?.title}`,
  }
}

async function getStaticProps(id: string | undefined) {
  if (!id) return

  const response = await fetch(`${url}/api/desks/getUnique?id=${id}`)

  return await response.json()
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { data } = await getStaticProps(params.slug)

  return (
    <section className="flex min-h-[calc(100vh_-_192px)] flex-col items-center bg-gradient-to-b from-grey-550 to-grey-500">
      <div className="flex items-center justify-center px-10 pt-8 sm:pt-14">
        <Heading size="lg" align="center" className="text-white">
          {data[0].title}
        </Heading>
      </div>
      <div className="flex w-full grow-[1] basis-0 flex-wrap justify-center p-10">
        <Suspense fallback={<Skeleton width={450} height={590} />}>
          {data?.map((desk: RDeskProps) => (
            <CardDesk
              className="flex-1"
              key={desk.id}
              category={desk.category}
              createdAt={desk.createdAt}
              description={desk.description}
              repo={desk.repo}
              title={desk.title}
              website={desk.website}
            />
          ))}
        </Suspense>
      </div>
    </section>
  )
}

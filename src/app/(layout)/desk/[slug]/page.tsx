/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import CardDesk from '@/components/cardDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { url } from '@/utils/constant'
import { DeskProps } from '@/utils/type'
import { Metadata } from 'next'
import FormComments from '@/components/Form/Comments/formComments'
import Comments from '@/components/comments'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(`${url}/api/desks/getUnique?id=${params.slug}`)
  const { data } = await response.json()

  return {
    title: `Desk | ${data[0]?.title}`,
  }
}

async function getServerSideProps(deskId: string | undefined) {
  if (!deskId) return

  const response = await fetch(`${url}/api/desks/getUnique?id=${deskId}`, {
    cache: 'reload',
  })

  return await response.json()
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { data }: { data: DeskProps[] } = await getServerSideProps(params.slug)

  return (
    <section className="flex min-h-[calc(100vh_-_192px)] flex-col items-center bg-gradient-to-b from-grey-550 to-grey-500">
      <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
        <Heading size="lg" align="center" className="text-white">
          Desk
        </Heading>
        <Text className="text-white/50">{data[0]?.title}</Text>
      </div>
      <div className="w-full space-y-6 px-10 py-6">
        <div className="flex w-full grow-[1] basis-0 flex-wrap items-center justify-center">
          <CardDesk className="flex-1" key={data[0].title} data={data[0]} />
        </div>
        <FormComments deskId={data[0].id} />
        <Comments deskId={params.slug} />
      </div>
    </section>
  )
}

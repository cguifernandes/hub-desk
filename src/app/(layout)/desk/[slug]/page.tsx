/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import CardDesk from '@/components/cardDesk'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { url } from '@/utils/constant'
import { DeskProps, RDeskProps } from '@/utils/type'
import { Metadata } from 'next'
import FormComments from '@/components/Form/Comments/formComments'
import Comments from '@/components/Layout/comments'

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

  const desk = await response.json()

  return {
    props: {
      desk,
    },
  }
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { props } = (await getServerSideProps(params.slug)) as {
    props: { desk: RDeskProps }
  }

  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center py-8 sm:py-14">
      {/* <div className="flex max-w-full flex-col items-center justify-center whitespace-nowrap px-10">
        <Heading size="lg" align="center" className="text-white">
          Desk
        </Heading>
        <Text className="truncate text-white/50">
          {props.desk.data[0]?.title}
        </Text>
      </div> */}
      <div className="w-full space-y-6 px-4">
        <CardDesk
          className="mx-auto w-full min-w-[320px] max-w-[520px] md:min-w-[420px]"
          data={props.desk.data[0]}
        />
        <FormComments deskId={props.desk.data[0].id} />
        <Comments deskId={params.slug} />
      </div>
    </section>
  )
}

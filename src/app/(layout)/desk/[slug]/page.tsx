/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { url } from '@/utils/constant'
import { RDeskProps } from '@/utils/type'
import { Metadata } from 'next'
import Comments from '@/components/Layout/comments'
import DeskWrapper from '@/components/Wrapper/deskWrapper'
import { cookies } from 'next/headers'
import DeskSideBar from '@/components/Layout/deskSideBar'

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

  const responseDesk = await fetch(`${url}/api/desks/getUnique?id=${deskId}`, {
    cache: 'reload',
  })

  const desk = await responseDesk.json()

  return {
    props: {
      desk,
    },
  }
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const user_session = cookieStore.get('user_session')
  const { props } = (await getServerSideProps(params.slug)) as {
    props: { desk: RDeskProps }
  }

  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center py-8 sm:py-14">
      <div className="w-full space-y-6 px-4">
        <div className="mx-auto flex max-w-7xl flex-col rounded-md border-2 border-grey-400 bg-desk-gradient lg:flex-row">
          <div className="relative flex min-h-[600px] flex-1 flex-col justify-between p-4 text-center">
            {props.desk.data[0].image && (
              <div className="absolute left-0 top-0 h-40 w-full">
                <img
                  src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${props.desk.data[0].image}`}
                  alt={props.desk.data[0].description}
                  className="h-full w-full overflow-clip rounded-tl-md object-cover object-center align-top"
                />
                <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-grey-600"></div>
              </div>
            )}
            <div
              style={{ marginTop: props.desk.data[0].image ? 120 : 0 }}
              className="z-10 flex flex-col gap-y-1"
            >
              <Heading size="md" className="break-words text-white">
                {props.desk.data[0].title}
              </Heading>
              <Text className="text-white/50">
                {props.desk.data[0].category}
              </Text>
            </div>
            <Text className="break-words">
              {props.desk.data[0].description}
            </Text>
            <DeskWrapper
              authorId={props.desk.data[0].authorId}
              createdAt={props.desk.data[0].createdAt}
            />
          </div>
          <DeskSideBar
            className="flex min-h-[520px] flex-col gap-y-3 border-t-2 border-grey-400 p-4 lg:min-h-0 lg:min-w-[408px] lg:border-l-2 lg:border-t-0"
            authorId={props.desk.data[0].authorId}
            user_session={user_session?.value}
            deskId={props.desk.data[0].id}
          />
        </div>
        <Comments
          isConnected={!!user_session?.value}
          user_session={user_session?.value}
          deskId={params.slug}
        />
      </div>
    </section>
  )
}

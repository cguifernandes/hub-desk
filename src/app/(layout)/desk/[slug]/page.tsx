/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { url } from '@/utils/constant'
import { RClientsProps, RDeskProps } from '@/utils/type'
import { Metadata } from 'next'
import Comments from '@/components/Layout/comments'
import DeskWrapper from '@/components/Wrapper/deskWrapper'
import { cookies } from 'next/headers'
import DeskSideBar from '@/components/Layout/deskSideBar'
import DeskSettings from '@/components/deskSettings'
import Button from '@/components/button'
import AnimationWrapper from '@/components/Wrapper/animationWrapper'
import Alert from '@/components/Layout/alert'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(`${url}/api/desks/getUnique?id=${params.slug}`)
  const data = await response.json()

  return {
    title: `Desk | ${data?.success ? data.data[0].title : 'Não encontrado'}`,
  }
}

async function getServerSideProps(deskId: string | undefined) {
  const headers = cookies()
  const user_session = headers.get('user_session')
  if (!deskId) return

  const responseDesk = await fetch(`${url}/api/desks/getUnique?id=${deskId}`, {
    cache: 'no-store',
  })

  const desk = await responseDesk.json()

  if (!user_session?.value) {
    return {
      props: {
        desk,
        user: {
          data: [],
        },
      },
    }
  }

  const responseUser = await fetch(
    `${url}/api/auth/getWithId?id=${user_session?.value}`,
    {
      cache: 'no-store',
    },
  )

  const user = await responseUser.json()

  return {
    props: {
      desk,
      user,
    },
  }
}

export default async function Desk({ params }: { params: { slug: string } }) {
  const { props } = (await getServerSideProps(params.slug)) as {
    props: { desk: RDeskProps; user: RClientsProps }
  }

  if (props.desk.success) {
    const cookieStore = cookies()
    const user_session = cookieStore.get('user_session')
    const desk = props.desk.data[0]
    const isLeader = desk?.authorId === user_session?.value
    const isCoLeader = props.user.data[0]?.members.some(
      (member) => member.role === 'Co-líder',
    )
    const isMember = props.user.data[0]?.members.some(
      (member) => member.userId === user_session?.value,
    )

    return (
      <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center py-8 sm:py-14">
        <div className="w-full space-y-6 px-4">
          <AnimationWrapper
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex max-w-7xl flex-col rounded-md border-2 border-grey-400 bg-desk-gradient lg:flex-row"
          >
            <div className="relative flex min-h-[600px] min-w-0 flex-1 flex-col justify-between p-4 text-center">
              {user_session?.value && isMember && (
                <DeskSettings
                  image={desk?.image}
                  deskId={desk?.id}
                  user_session={user_session?.value}
                  isLeader={isLeader}
                  isCoLeader={isCoLeader}
                  isMember={isMember}
                />
              )}
              {desk?.image && (
                <div className="absolute left-0 top-0 h-40 w-full">
                  <img
                    src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${desk?.image}`}
                    alt={desk?.description}
                    className="h-full w-full overflow-clip rounded-tl-md object-cover object-center align-top"
                  />
                  <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-grey-600"></div>
                </div>
              )}
              <div
                style={{ marginTop: desk?.image ? 120 : 0 }}
                className="z-10 flex flex-col gap-y-1"
              >
                <Heading size="md" className="break-words text-white">
                  {desk?.title}
                </Heading>
                <Text className="text-white/50">{desk?.category}</Text>
              </div>
              <Text className="break-all">{desk?.description}</Text>
              {desk?.category === 'Sites' && (
                <div className="mx-auto flex w-4/5 flex-col gap-6 md:w-2/4">
                  {desk?.repo !== '' && (
                    <Button
                      target="_blank"
                      href={desk?.repo}
                      fill="empty"
                      text="Repositório"
                      isDeskCard
                    />
                  )}
                  {desk?.website !== '' && (
                    <Button
                      target="_blank"
                      href={desk?.website}
                      text="Site"
                      isDeskCard
                    />
                  )}
                </div>
              )}
              <DeskWrapper
                comments={desk?._count.comments}
                author={desk?.author}
                createdAt={desk?.createdAt}
              />
            </div>
            <DeskSideBar
              className="flex min-h-[520px] flex-col gap-y-3 border-t-2 border-grey-400 p-4 lg:min-h-0 lg:min-w-[360px] lg:border-l-2 lg:border-t-0 xl:min-w-[380px]"
              user_session={user_session?.value}
              deskId={desk?.id}
              isLeader={isLeader}
              authorId={desk?.authorId}
              visibility={desk?.visibility}
            />
          </AnimationWrapper>
          <Comments
            isConnected={!!user_session?.value}
            user_session={user_session?.value}
            deskId={params.slug}
            user={props.user.data}
          />
        </div>
      </section>
    )
  } else {
    return (
      <Alert>
        <Heading size="md" align="center">
          Essa desk não foi encontrada
        </Heading>
        <Text className="text-white/50">
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

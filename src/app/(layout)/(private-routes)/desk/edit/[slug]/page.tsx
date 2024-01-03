/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
import EditFormDesk from '@/components/Form/Desk/editFormDesk'
import ErrorAlert from '@/components/Layout/errorAlert'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import { url } from '@/utils/constant'
import { RDeskProps } from '@/utils/type'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const response = await fetch(`${url}/api/desks/getUnique?id=${params.slug}`, {
    cache: 'no-store',
  })
  const { data } = await response.json()

  return {
    title: `Editar desk | ${data[0]?.title}`,
  }
}

async function getServerSideProps(deskId: string | undefined) {
  const headers = cookies()
  const user_session = headers.get('user_session')
  if (!deskId) return

  const response = await fetch(`${url}/api/desks/getUnique?id=${deskId}`, {
    cache: 'no-store',
  })

  const desk = (await response.json()) as RDeskProps

  if (
    desk.data[0].members.find(
      (member) =>
        member.userId !== user_session?.value && member.role === 'Membro',
    )
  ) {
    return {
      props: {
        desk: { data: [] },
      },
    }
  }

  return {
    props: {
      desk,
    },
  }
}

const EditDesk = async ({ params }: { params: { slug: string } }) => {
  const { props } = (await getServerSideProps(params.slug)) as {
    props: { desk: RDeskProps }
  }

  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center py-8 lg:py-10">
      {props.desk.data.length === 0 ? (
        <div className="flex flex-col gap-y-6">
          <div className="w-full px-8 pb-4 text-center lg:px-10 lg:pb-6">
            <Heading className="text-xl">
              Você não tem permissão para editar essa desk
            </Heading>
            <Text className="text-white/50">
              <Link className="gradient-text" href={'/'}>
                Clique aqui
              </Link>{' '}
              para retornar para a página home
            </Text>
          </div>
          <ErrorAlert />
        </div>
      ) : (
        <>
          <div className="w-full px-8 pb-4 text-center lg:px-10 lg:pb-6">
            <Heading className="text-xl">
              Ao editar os dados de uma desk, eles não poderão ser convertidos
            </Heading>
            <Text className="text-white/50">
              Campos com “*” são obrigatórios
            </Text>
          </div>
          <EditFormDesk
            author={props.desk.data[0].author!}
            desk={props.desk.data[0]}
          />
        </>
      )}
    </section>
  )
}

export default EditDesk

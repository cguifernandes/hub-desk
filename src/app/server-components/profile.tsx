/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
import { ResponseProps } from '@/utils/type'
import { cookies } from 'next/headers'

export async function getStaticProps() {
  const user_session = cookies().get('user_session')?.value

  const url =
    process?.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://hub-desk.vercel.app'
  const response = await fetch(`${url}/api/clients?id=${user_session}`)

  return (await response.json()) as ResponseProps
}

export const PFP = async () => {
  const { clients } = await getStaticProps()

  return (
    <>
      {clients.map((client) => (
        <img
          key={client.id}
          alt={client.name}
          src={client.pfp}
          className="h-11 w-11 overflow-clip rounded-full object-cover object-center align-top"
        />
      ))}
    </>
  )
}

// export const Profile = async () => {
//   const { clients } = await getStaticProps()

//   return (
//     <>
//       {clients.map((client) => (
//         <div
//           key={client.id}
//           className="flex flex-col items-center justify-between gap-y-8"
//         >
//           <img
//             alt={client.name}
//             src={client.pfp}
//             className="h-28 w-28 overflow-clip rounded-full object-cover object-center align-top"
//           />
//           <Heading
//             size="md"
//             className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
//             align="center"
//           >
//             {client.name}
//           </Heading>
//         </div>
//       ))}
//     </>
//   )
// }

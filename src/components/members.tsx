/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Text from './Typography/text'
import Skeleton from './Layout/skeleton'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Toast } from '@/utils/toast'
import { MemberProps, RMembersProps } from '@/utils/type'
import Heading from './Typography/heading'
import { url } from '@/utils/constant'

type MembersProps = {
  isLeader: boolean
  members: MemberProps[] | undefined
  setMembers: Dispatch<SetStateAction<MemberProps[] | undefined>>
}

const Members = ({ members, isLeader, setMembers }: MembersProps) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${url}/api/members/getWithDeskId?id=6585ae16706bba2a4249827a&page=0`,
          {
            cache: 'no-cache',
          },
        )

        const data: RMembersProps = await response.json()

        if (data.error) {
          Toast(data.error)
        } else {
          setMembers(data.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getClient()
  }, [])

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex h-[72px] w-full items-center gap-x-2 rounded-md border-2 border-grey-400 p-3">
            <Skeleton isRoundedFull height={40} width={40} />
            <div className="flex flex-col gap-y-1">
              <Skeleton height={24} width={150} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
          <div className="flex h-[72px] w-full items-center gap-x-2 rounded-md border-2 border-grey-400 p-3">
            <Skeleton isRoundedFull height={40} width={40} />
            <div className="flex flex-col gap-y-1">
              <Skeleton height={24} width={150} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
          <div className="flex h-[72px] w-full items-center gap-x-2 rounded-md border-2 border-grey-400 p-3">
            <Skeleton isRoundedFull height={40} width={40} />
            <div className="flex flex-col gap-y-1">
              <Skeleton height={24} width={150} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
          <div className="flex h-[72px] w-full items-center gap-x-2 rounded-md border-2 border-grey-400 p-3">
            <Skeleton isRoundedFull height={40} width={40} />
            <div className="flex flex-col gap-y-1">
              <Skeleton height={24} width={150} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
        </>
      ) : (
        members?.map((member) => (
          <Link
            className="flex items-center gap-x-2 rounded-md border-2 border-grey-400 p-3 transition-colors hover:bg-grey-600"
            key={member.id}
            href={`/profile/${member.user.user}`}
          >
            <img
              className="h-10 w-10 rounded-full object-cover object-center align-top"
              src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${member.user.pfp}`}
              alt={member.user.user}
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <Heading>{member.user.user}</Heading>
                <Text className="text-sm text-white/50">{member.role}</Text>
              </div>
              {isLeader && (
                <button>
                  <MoreVertical color="#fff" size={24} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </Link>
        ))
      )}
    </>
  )
}

export default Members

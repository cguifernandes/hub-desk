/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Text from './Typography/text'
import Skeleton from './Layout/skeleton'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Toast } from '@/utils/toast'
import { MemberProps, RMembersProps } from '@/utils/type'
import Heading from './Typography/heading'
import { url } from '@/utils/constant'
import MemberConfig from './memberConfig'
import Pagination from './Layout/pagination'

type MembersProps = {
  isLeader: boolean
  members: MemberProps[] | undefined
  setMembers: Dispatch<SetStateAction<MemberProps[] | undefined>>
  deskId: string | undefined
  authorId: string | undefined
}

const Members = ({
  members,
  isLeader,
  setMembers,
  deskId,
  authorId,
}: MembersProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(count / 4)

  useEffect(() => {
    const getClient = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${url}/api/members/getWithDeskId?id=${deskId}&page=${page}`,
          {
            cache: 'no-cache',
          },
        )

        const data: RMembersProps = await response.json()

        if (data.error) {
          Toast(data.error)
        } else {
          setMembers(data.data)
          setCount(data.count)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getClient()
  }, [page])

  return (
    <>
      <div className="flex flex-col justify-between gap-y-2">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex h-[70px] w-full items-center gap-x-2 rounded-md border border-grey-400 p-3"
              >
                <Skeleton isRoundedFull height={40} width={40} />
                <div className="flex flex-col gap-y-1">
                  <Skeleton height={20} width={150} />
                  <Skeleton height={16} width={50} />
                </div>
              </div>
            ))}
          </>
        ) : (
          members?.map((member) => (
            <div
              className="relative flex h-[70px] items-center gap-x-2 rounded-md border border-grey-400 p-3 transition-colors hover:bg-grey-600"
              key={member.id}
            >
              <img
                className="h-10 w-10 rounded-full object-cover object-center align-top"
                src={`https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${member.user.pfp}`}
                alt={member.user.user}
              />
              <div className="flex w-full items-center justify-between">
                <Link
                  href={`/profile/${member.user.user}`}
                  className="flex flex-col"
                >
                  <Heading>{member.user.user}</Heading>
                  <Text className="text-sm text-white/50">{member.role}</Text>
                </Link>
                {isLeader && member.userId !== authorId && (
                  <MemberConfig
                    userId={member.userId}
                    deskId={deskId}
                    setMembers={setMembers}
                    role={member.role}
                    page={page}
                    setPage={setPage}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        size="sm"
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default Members

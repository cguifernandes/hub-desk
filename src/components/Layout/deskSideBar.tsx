/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
'use client'
import Multiselect from '../multiselect'
import { useState } from 'react'
import { MemberProps } from '@/utils/type'
import Heading from '../Typography/heading'
import Button from '../button'
import Members from '../members'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'

type SideBarProps = {
  className?: string
  authorId: string | undefined
  user_session: string | undefined
  deskId: string | undefined
}

const DeskSideBar = ({
  authorId,
  user_session,
  className,
  deskId,
}: SideBarProps) => {
  const [inviteMember, setInviteMember] = useState<{
    userId: string
    user: string
  }>()
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState<MemberProps[]>()
  const isLeader = authorId === user_session

  const handlerInviteMember = async () => {
    try {
      setIsLoading(true)

      const { data } = await api.post(
        `/invite`,
        { deskId, receiverId: inviteMember?.userId, senderId: user_session },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={className}>
      {isLeader && (
        <div className="flex flex-col gap-y-1">
          <Multiselect
            setInviteMember={setInviteMember}
            placeholder="Convidar membros"
            style={{
              color:
                inviteMember === undefined
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'white',
            }}
            value={
              inviteMember === undefined
                ? 'Convidar membros'
                : inviteMember.user
            }
            members={members}
          />
          {inviteMember !== undefined && (
            <Button
              onClick={handlerInviteMember}
              className="w-full"
              text="Convidar membro selecionado"
              loading={isLoading}
            />
          )}
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        <Heading>Membros</Heading>
        <div className="flex flex-col justify-between gap-y-2">
          <Members
            isLeader={isLeader}
            members={members}
            setMembers={setMembers}
          />
        </div>
      </div>
    </div>
  )
}

export default DeskSideBar

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
  user_session: string | undefined
  deskId: string | undefined
  isLeader: boolean
}

const DeskSideBar = ({
  user_session,
  className,
  deskId,
  isLeader,
}: SideBarProps) => {
  const [inviteMember, setInviteMember] = useState<{
    userId: string
    user: string
  }>()
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState<MemberProps[]>()

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
      <Heading size="md">Informações da desk</Heading>
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
        <Members
          isLeader={isLeader}
          members={members}
          setMembers={setMembers}
          deskId={deskId}
        />
      </div>
    </div>
  )
}

export default DeskSideBar

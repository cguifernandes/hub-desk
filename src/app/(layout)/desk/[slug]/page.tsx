/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import useClient from '@/hooks/useClient'
import { api } from '@/utils/api'
import { RDeskProps, ResponseProps } from '@/utils/type'
import { useEffect, useState } from 'react'

const Desk = ({ params }: { params: { slug: string } }) => {
  const { user_session } = useClient()

  return <p>{params.slug}</p>
}

export default Desk

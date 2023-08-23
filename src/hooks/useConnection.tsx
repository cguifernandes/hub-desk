/* eslint-disable camelcase */
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

const useConnection = () => {
  const { user_session, agree_cookies } = parseCookies()
  const [cookies, setCookies] = useState({})
  const isConnected = !!user_session

  useEffect(() => {
    if (user_session) {
      setCookies(user_session)
    }
  }, [user_session])

  return { cookies, isConnected, agree_cookies }
}

export default useConnection

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { parseCookies } from 'nookies'

const useClient = () => {
  const { user_session } = parseCookies()
  const isConnected = !!user_session

  return { user_session, isConnected }
}

export default useClient

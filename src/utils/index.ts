import { api } from './api'
import { ResponseProps } from './type'

const getAuthor = async (id: string | undefined) => {
  const { data }: { data: ResponseProps } = await api.get(`/auth?id=${id}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  const author = data.clients.map((client) => client.name)

  return author
}

export default getAuthor

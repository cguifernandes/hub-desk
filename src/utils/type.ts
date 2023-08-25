export type ClientsProps = {
  id: string
  email: string
  password: string
  name: string
  pfp: string
}

export type ResponseProps = {
  error: string
  success: string
  id: string
  clients: ClientsProps[]
}

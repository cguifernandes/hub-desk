/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClientsProps = {
  id: string
  email: string
  password: string
  user: string
  pfp: string
  createdAt: Date
}

export type CommentProps = {
  id: string
  text: string
  createdAt: Date
  authorId: string
  deskId: string
}

export type MemberProps = {
  id: string
  deskId: string
  role: 'Líder' | 'Co-líder' | 'Membro'
  userId: string
  user: ClientsProps
}

export type RMembersProps = {
  sucess?: string
  error?: string
  data: MemberProps[]
  count: number
}

export type DeskProps = {
  id?: string
  createdAt: Date
  authorId?: string
  title: string
  description: string
  repo: string
  website: string
  name?: string[]
  image: string
  visibility: 'Público' | 'Privado'
  category:
    | 'Animes'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
  members: {
    userId: string
    role: string
    deskId: string
  }[]
}

export type FakeRDeskProps = {
  title?: string
  description?: string
  src?: string
  category?:
    | 'Animes'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
    | any
}

export type RDeskProps = {
  sucess: string
  data: DeskProps[]
  count: number
}

export type RClientsProps = {
  error: string
  success: string
  data: ClientsProps[]
}

export type RCommentsProps = {
  error: string
  success: string
  data: CommentProps[]
}

export type RSearchProps = {
  clients: ClientsProps[]
  desks: DeskProps[]
}

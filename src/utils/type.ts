/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClientsProps = {
  id: string
  email: string
  password: string
  user: string
  pfp: string
  bg: string
  createdAt: Date
  _count?: {
    desks: number
  }
  members: {
    id: string
    deskId: string
    role: 'Líder' | 'Co-líder' | 'Membro'
    userId: string
  }[]
}

export type CommentProps = {
  id: string
  text: string
  createdAt: Date
  authorId: string
  deskId: string
  author?: ClientsProps
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
    | 'Geek'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
  members: {
    userId: string
    role: 'Líder' | 'Co-líder' | 'Membro'
    deskId: string
  }[]
  _count: {
    comments: number
  }
  author?: ClientsProps
}

export type InviteProps = {
  id: string
  receiverId: string
  senderId: string
  deskId: string
  createdAt: Date
  desk?: DeskProps
  receiver?: ClientsProps
  sender?: ClientsProps
  user?: ClientsProps
}

export type RInviteProps = {
  success: string
  error: string
  data: InviteProps[]
}

export type FakeRDeskProps = {
  title?: string
  description?: string
  src?: string
  repo?: string
  website?: string
  category?:
    | 'Geek'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
    | any
}

export type RDeskProps = {
  success: string
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

export type ClientsProps = {
  id: string
  email: string
  password: string
  name: string
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

export type DeskProps = {
  id?: string
  createdAt: Date
  authorId?: string
  title: string
  description: string
  repo: string
  website: string
  name?: string[]
  category:
    | 'Animes'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
    | 'Todas categorias'
}

export type FakeRDeskProps = {
  title: string
  description: string
  src?: string
  category:
    | 'Animes'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
    | 'Todas categorias'
}

export type RDeskProps = {
  sucess: string
  data: DeskProps[]
  count: number
}

export type ResponseProps = {
  error: string
  success: string
  id: string
  clients: ClientsProps[]
  data: DeskProps[]
}

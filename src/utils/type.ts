export type ClientsProps = {
  id: string
  email: string
  password: string
  name: string
  pfp: string
}

export type Comment = {
  id: string
  text: string
  createdAt: Date
  authorId: string
  deskId: string
}

export type RDeskProps = {
  id?: string
  createdAt: Date
  authorId?: string
  category:
    | 'Animes'
    | 'Desenhos'
    | 'Filmes'
    | 'Jogos'
    | 'Outros'
    | 'Séries'
    | 'Sites'
    | 'Todas categorias'
  title: string
  description: string
  repo: string
  website: string
  comments?: Comment[]
  name?: string[]
}

export type ResponseProps = {
  error: string
  success: string
  id: string
  clients: ClientsProps[]
  data: RDeskProps[]
}

export const categories = [
  {
    value: 'Desenhos',
    id: 2,
  },
  {
    value: 'Filmes',
    id: 3,
  },
  {
    value: 'Geek',
    id: 1,
  },
  { value: 'Jogos', id: 4 },
  { value: 'Outros', id: 5 },
  {
    value: 'Séries',
    id: 6,
  },
  { value: 'Sites', id: 7 },
]

export const visibility = [
  {
    value: 'Público',
    id: 1,
  },
  {
    value: 'Privado',
    id: 2,
  },
]

export const PRIVATE_ROUTES = [
  { path: '/desk/post' },
  { path: 'settings/account' },
]

export const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif']

export const url =
  process?.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://hub-desk.vercel.app'

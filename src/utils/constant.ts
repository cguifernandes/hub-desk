export const categories = [
  {
    name: 'Animes',
  },
  {
    name: 'Desenhos',
  },
  {
    name: 'Filmes',
  },
  { name: 'Jogos' },
  { name: 'Outros' },
  {
    name: 'Séries',
  },
  { name: 'Sites' },
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

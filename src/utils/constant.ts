export const categories = [
  {
    name: 'Animes',
    path: '/topics/animes',
  },
  {
    name: 'Desenhos',
    path: '/topics/designs',
  },
  {
    name: 'Filmes',
    path: '/topics/movies',
  },
  { name: 'Jogos', path: '/topics/games' },
  { name: 'Outros', path: '/topics/others' },
  {
    name: 'Séries',
    path: '/topics/series',
  },
  { name: 'Sites', path: '/topics/websites' },
]

export const ROUTES = {
  private: {
    desk: '/desk',
    dashboard: '/dashboard',
  },
  public: {
    home: '/',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    redirect: '/auth/redirect',
  },
}

export const url =
  process?.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://hub-desk.vercel.app'

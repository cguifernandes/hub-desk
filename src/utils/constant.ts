export const categories = [
  { name: 'Animes', id: '1' },
  { name: 'Desenhos', id: '2' },
  { name: 'Filmes', id: '3' },
  { name: 'Jogos', id: '4' },
  { name: 'Séries', id: '5' },
  { name: 'Outros', id: '6' },
  { name: 'Sites', id: '7' },
]

export const ROUTES = {
  private: {
    desk: { name: '/desk' },
  },
  public: {
    home: '/',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    redirect: '/auth/redirect',
  },
}

export const routes = {
  auth: '/auth',
  gallery: '/',
  breeds: '/breeds',
  breedDetail: (id: string) => `/breeds/${id}`,
  favorites: '/favorites',
} as const

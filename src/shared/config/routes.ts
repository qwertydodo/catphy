export const routes = {
  auth: {
    path: '/auth',
    title: 'Sign In | Catphy',
    description: 'Enter your Cat API key to get started.',
  },
  gallery: {
    path: '/',
    title: 'Gallery | Catphy',
    description: 'Browse random cat photos from around the world.',
  },
  breeds: {
    path: '/breeds',
    title: 'Breeds | Catphy',
    description: 'Explore all cat breeds.',
  },
  favorites: {
    path: '/favorites',
    title: 'Favorites | Catphy',
    description: 'Your saved cat photos.',
  },
  breedDetail: {
    path: (id: string) => `/breeds/${id}`,
    meta: (name: string) => ({
      title: `${name} | Catphy`,
      description: `Explore photos and info for the ${name} breed.`,
    }),
  },
}

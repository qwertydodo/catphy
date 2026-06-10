import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { BreedDetailPage } from '../pages/BreedDetailPage'
import { BreedsPage } from '../pages/BreedsPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { GalleryPage } from '../pages/GalleryPage'
import { routes } from '../shared/config/routes'
import { Layout } from '../shared/ui/Layout'
import { RequireApiKey } from './guards/RequireApiKey'

export const router = createBrowserRouter([
  {
    path: routes.auth.path,
    element: <AuthPage />,
  },
  {
    element: <RequireApiKey />,
    children: [
      {
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ),
        children: [
          { path: routes.gallery.path, element: <GalleryPage /> },
          { path: routes.breeds.path, element: <BreedsPage /> },
          { path: routes.breedDetail.path(':id'), element: <BreedDetailPage /> },
          { path: routes.favorites.path, element: <FavoritesPage /> },
        ],
      },
    ],
  },
])

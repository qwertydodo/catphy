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
    path: routes.auth,
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
          { path: routes.gallery, element: <GalleryPage /> },
          { path: routes.breeds, element: <BreedsPage /> },
          { path: routes.breedDetail(':id'), element: <BreedDetailPage /> },
          { path: routes.favorites, element: <FavoritesPage /> },
        ],
      },
    ],
  },
])

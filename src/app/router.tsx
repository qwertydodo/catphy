import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { BreedDetailPage } from '../pages/BreedDetailPage'
import { BreedsPage } from '../pages/BreedsPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { GalleryPage } from '../pages/GalleryPage'
import { Layout } from '../shared/ui/Layout'
import { RequireApiKey } from './guards/RequireApiKey'

export const router = createBrowserRouter([
  {
    path: '/auth',
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
          { path: '/', element: <GalleryPage /> },
          { path: '/breeds', element: <BreedsPage /> },
          { path: '/breeds/:id', element: <BreedDetailPage /> },
          { path: '/favorites', element: <FavoritesPage /> },
        ],
      },
    ],
  },
])

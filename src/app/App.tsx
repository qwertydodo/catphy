import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Providers } from './providers'
import { router } from './router'

export const App = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

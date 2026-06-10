import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { routeTree } from './router'

describe('routeTree', () => {
  it('matches the root route when served from a subpath basename', () => {
    const router = createMemoryRouter(routeTree, {
      basename: '/catphy/',
      initialEntries: ['/catphy/'],
    })
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    expect(screen.queryByText(/unexpected application error/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/api key/i)).toBeInTheDocument()
  })
})

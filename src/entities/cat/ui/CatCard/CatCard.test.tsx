import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CatCard } from './CatCard'

vi.mock('../../../../shared/api/httpClient', () => ({
  httpClient: { post: vi.fn(), delete: vi.fn() },
}))

const mockImage = {
  id: 'abc',
  url: 'https://cdn2.thecatapi.com/images/abc.jpg',
  width: 800,
  height: 600,
  breeds: [],
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
)

describe('CatCard', () => {
  it('renders cat image', () => {
    render(<CatCard image={mockImage} isFavorited={false} />, { wrapper })
    expect(screen.getByRole('img')).toHaveAttribute('src', mockImage.url)
  })

  it('shows filled heart when favorited', () => {
    render(<CatCard image={mockImage} isFavorited={true} favoriteId={1} />, { wrapper })
    expect(screen.getByRole('button', { name: /unfavorite/i })).toBeInTheDocument()
  })

  it('shows empty heart when not favorited', () => {
    render(<CatCard image={mockImage} isFavorited={false} />, { wrapper })
    expect(screen.getByRole('button', { name: /favorite/i })).toBeInTheDocument()
  })
})

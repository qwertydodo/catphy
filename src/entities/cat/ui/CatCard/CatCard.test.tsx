import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { wrapper } from '../../../../test/utils'
import { CatCard } from './CatCard'

vi.mock('../../../../shared/api/catApiClient', () => ({
  catApiClient: { post: vi.fn(), delete: vi.fn() },
}))

const mockImage = {
  id: 'abc',
  url: 'https://cdn2.thecatapi.com/images/abc.jpg',
  width: 800,
  height: 600,
  breeds: [],
}

describe('CatCard', () => {
  it('renders cat image', () => {
    render(<CatCard image={mockImage} isFavorited={false} />, { wrapper })
    const img = screen.getByAltText('A cat')
    fireEvent.load(img)
    expect(img).toHaveAttribute('src', mockImage.url)
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

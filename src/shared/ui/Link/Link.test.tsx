import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Link } from './Link'

describe('Link', () => {
  it('renders an external href as an anchor with target and rel', () => {
    render(<Link href="https://example.com">External</Link>)
    const link = screen.getByRole('link', { name: 'External' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('does not add target/rel for a non-external href', () => {
    render(<Link href="/local">Local</Link>)
    const link = screen.getByRole('link', { name: 'Local' })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  it('lets target/rel be overridden on an external href', () => {
    render(
      <Link href="https://example.com" target="_self" rel="author">
        External
      </Link>
    )
    const link = screen.getByRole('link', { name: 'External' })
    expect(link).toHaveAttribute('target', '_self')
    expect(link).toHaveAttribute('rel', 'author')
  })

  it('renders a "to" prop as an internal navigation link', () => {
    render(
      <MemoryRouter>
        <Link to="/gallery">Gallery</Link>
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', '/gallery')
  })

  it('supports NavLink-style active className function for "to" links', () => {
    render(
      <MemoryRouter initialEntries={['/gallery']}>
        <Link
          to="/gallery"
          end
          className={({ isActive }) => (isActive ? 'is-active' : 'is-inactive')}
        >
          Gallery
        </Link>
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveClass('is-active')
  })

  it('variant="unstyled" applies only the given className', () => {
    render(
      <Link href="/local" variant="unstyled" className="custom">
        Local
      </Link>
    )
    expect(screen.getByRole('link', { name: 'Local' }).className).toBe('custom')
  })

  it('variant="text" (default) applies base styling beyond the given className', () => {
    render(
      <Link href="/local" className="custom">
        Local
      </Link>
    )
    const link = screen.getByRole('link', { name: 'Local' })
    expect(link.className).toContain('custom')
    expect(link.className).not.toBe('custom')
  })

  it('size="sm" adds an additional class compared to the default size', () => {
    const { rerender } = render(<Link href="/local">Local</Link>)
    const defaultClass = screen.getByRole('link', { name: 'Local' }).className

    rerender(
      <Link href="/local" size="sm">
        Local
      </Link>
    )
    const smClass = screen.getByRole('link', { name: 'Local' }).className

    expect(smClass).not.toBe(defaultClass)
  })
})

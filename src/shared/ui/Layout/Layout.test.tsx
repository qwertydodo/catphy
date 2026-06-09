import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { setApiKey } from '../../lib/storage'
import { Layout } from './Layout'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

afterEach(() => {
  localStorage.clear()
  mockNavigate.mockClear()
})

describe('Layout', () => {
  it('renders Log out button', () => {
    render(
      <MemoryRouter>
        <Layout>content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
  })

  it('clears API key when logging out', async () => {
    setApiKey('test-key')
    render(
      <MemoryRouter>
        <Layout>content</Layout>
      </MemoryRouter>
    )
    await userEvent.click(screen.getByRole('button', { name: /log out/i }))
    expect(localStorage.getItem('cat_api_key')).toBeNull()
  })

  it('navigates to /auth when logging out', async () => {
    render(
      <MemoryRouter>
        <Layout>content</Layout>
      </MemoryRouter>
    )
    await userEvent.click(screen.getByRole('button', { name: /log out/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/auth')
  })
})

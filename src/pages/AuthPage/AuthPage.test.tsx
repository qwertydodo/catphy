import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthPage } from './AuthPage'

vi.mock('../../shared/api/httpClient', () => ({
  httpClient: { get: vi.fn() },
}))

import { httpClient } from '../../shared/api/httpClient'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
)

describe('AuthPage', () => {
  it('renders API key input and submit button', () => {
    render(<AuthPage />, { wrapper })
    expect(screen.getByLabelText(/api key/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty key', async () => {
    render(<AuthPage />, { wrapper })
    await userEvent.click(screen.getByRole('button', { name: /save/i }))
    expect(screen.getByText(/api key is required/i)).toBeInTheDocument()
  })

  it('shows error on invalid key (401)', async () => {
    vi.mocked(httpClient.get).mockRejectedValue({ response: { status: 401 } })
    render(<AuthPage />, { wrapper })
    await userEvent.type(screen.getByLabelText(/api key/i), 'bad-key')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))
    await waitFor(() => expect(screen.getByText(/invalid api key/i)).toBeInTheDocument())
  })
})

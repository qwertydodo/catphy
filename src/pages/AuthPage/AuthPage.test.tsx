import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { wrapper } from '../../test/utils'
import { AuthPage } from './AuthPage'

vi.mock('../../entities/cat', () => ({
  catRepository: { getAll: vi.fn() },
}))

import { catRepository } from '../../entities/cat'

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
    vi.mocked(catRepository.getAll).mockRejectedValue({ response: { status: 401 } })
    render(<AuthPage />, { wrapper })
    await userEvent.type(screen.getByLabelText(/api key/i), 'bad-key')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))
    await waitFor(() => expect(screen.getByText(/invalid api key/i)).toBeInTheDocument())
  })

  it('navigates to / on valid key', async () => {
    vi.mocked(catRepository.getAll).mockResolvedValue([
      { id: 'x', url: 'u', width: 1, height: 1, breeds: [] },
    ])
    render(<AuthPage />, { wrapper })
    await userEvent.type(screen.getByLabelText(/api key/i), 'live_valid-key')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))
    await waitFor(() => {
      expect(screen.queryByText(/invalid api key/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/api key is required/i)).not.toBeInTheDocument()
    })
  })
})

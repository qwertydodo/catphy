import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { ErrorPage } from './ErrorPage'

const renderRoute = (initialEntry: string, element: ReactElement) => {
  const router = createMemoryRouter(
    [
      {
        errorElement: <ErrorPage />,
        children: [{ path: '/', element }],
      },
    ],
    { initialEntries: [initialEntry] }
  )
  return render(<RouterProvider router={router} />)
}

describe('ErrorPage', () => {
  it('shows the not-found view for unmatched routes', () => {
    renderRoute('/does-not-exist', <div>Home</div>)

    expect(screen.getByText('Cat run somewhere')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to gallery/i })).toBeInTheDocument()
  })

  it('shows the crash view and logs the error for render errors', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    const Throws = () => {
      throw new Error('boom')
    }
    renderRoute('/', <Throws />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go to gallery/i })).toBeInTheDocument()
    expect(consoleError).toHaveBeenCalled()

    consoleError.mockRestore()
  })
})

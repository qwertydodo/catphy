import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ImageWithFallback } from './ImageWithFallback'

describe('ImageWithFallback', () => {
  it('hides image and shows loading placeholder initially', () => {
    render(<ImageWithFallback src="cat.jpg" alt="A cat" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByAltText('A cat')).toHaveStyle('display: none')
  })

  it('shows image and removes loading placeholder after load', () => {
    render(<ImageWithFallback src="cat.jpg" alt="A cat" />)
    const img = screen.getByAltText('A cat')
    fireEvent.load(img)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(img).toHaveStyle('display: block')
  })

  it('shows default error message after load error', () => {
    render(<ImageWithFallback src="bad.jpg" alt="A cat" />)
    fireEvent.error(screen.getByAltText('A cat'))
    expect(screen.getByText('Sorry, cat not loaded')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows custom error message after load error', () => {
    render(<ImageWithFallback src="bad.jpg" alt="A cat" errorMessage="Oops, no cat here" />)
    fireEvent.error(screen.getByAltText('A cat'))
    expect(screen.getByText('Oops, no cat here')).toBeInTheDocument()
  })

  it('resets to loading state when src changes', () => {
    const { rerender } = render(<ImageWithFallback src="cat1.jpg" alt="A cat" />)
    fireEvent.load(screen.getByAltText('A cat'))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    rerender(<ImageWithFallback src="cat2.jpg" alt="A cat" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})

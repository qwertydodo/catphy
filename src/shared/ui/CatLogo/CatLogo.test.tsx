import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CatLogo } from './CatLogo'

describe('CatLogo', () => {
  it('renders the xl size at 128px tall', () => {
    const { container } = render(<CatLogo size="xl" />)
    expect(container.querySelector('img')).toHaveAttribute('height', '128')
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from './Text'

describe('Text', () => {
  it('renders h1 variant as h1 element', () => {
    render(<Text variant="h1">Heading</Text>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading')
  })

  it('renders body variant as p element', () => {
    render(<Text variant="body">Body text</Text>)
    expect(screen.getByText('Body text').tagName).toBe('P')
  })

  it('renders with as prop override', () => {
    render(
      <Text variant="h1" as="span">
        Heading
      </Text>
    )
    expect(screen.getByText('Heading').tagName).toBe('SPAN')
  })

  it('renders with muted prop without throwing', () => {
    render(
      <Text variant="body" muted>
        Muted
      </Text>
    )
    expect(screen.getByText('Muted')).toBeInTheDocument()
  })
})

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useApiKey } from './useApiKey'

afterEach(() => localStorage.clear())

describe('useApiKey', () => {
  it('returns null key when not set', () => {
    const { result } = renderHook(() => useApiKey())
    expect(result.current.apiKey).toBeNull()
  })

  it('saves and exposes key', () => {
    const { result } = renderHook(() => useApiKey())
    act(() => result.current.saveKey('my-key'))
    expect(result.current.apiKey).toBe('my-key')
  })

  it('clears key', () => {
    const { result } = renderHook(() => useApiKey())
    act(() => result.current.saveKey('my-key'))
    act(() => result.current.clearKey())
    expect(result.current.apiKey).toBeNull()
  })
})

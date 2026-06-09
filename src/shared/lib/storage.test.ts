import { afterEach, describe, expect, it } from 'vitest'
import { clearApiKey, getApiKey, setApiKey } from './storage'

const KEY = 'cat_api_key'

afterEach(() => localStorage.clear())

describe('storage', () => {
  it('returns null when key not set', () => {
    expect(getApiKey()).toBeNull()
  })

  it('sets and retrieves api key', () => {
    setApiKey('test-key-123')
    expect(getApiKey()).toBe('test-key-123')
    expect(localStorage.getItem(KEY)).toBe('test-key-123')
  })

  it('clears api key', () => {
    setApiKey('test-key-123')
    clearApiKey()
    expect(getApiKey()).toBeNull()
  })
})

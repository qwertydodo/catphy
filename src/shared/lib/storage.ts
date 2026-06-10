const STORAGE_KEYS = {
  API_KEY: 'cat_api_key',
} as const

export const getApiKey = (): string | null => localStorage.getItem(STORAGE_KEYS.API_KEY)

export const setApiKey = (key: string): void => localStorage.setItem(STORAGE_KEYS.API_KEY, key)

export const clearApiKey = (): void => localStorage.removeItem(STORAGE_KEYS.API_KEY)

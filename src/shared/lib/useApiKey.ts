import { useState } from 'react'
import { clearApiKey, getApiKey, setApiKey } from './storage'

export const useApiKey = () => {
  const [apiKey, setApiKeyState] = useState<string | null>(getApiKey)

  const saveKey = (key: string) => {
    setApiKey(key)
    setApiKeyState(key)
  }

  const clearKey = () => {
    clearApiKey()
    setApiKeyState(null)
  }

  return { apiKey, saveKey, clearKey }
}

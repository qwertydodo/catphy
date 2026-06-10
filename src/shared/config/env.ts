const requireEnv = (key: string): string => {
  const value = import.meta.env[key] as string | undefined
  if (!value) throw new Error(`${key} is not defined`)
  return value
}

export const env = {
  catApiBaseUrl: requireEnv('VITE_CAT_API_BASE_URL'),
  catCdnBaseUrl: requireEnv('VITE_CAT_CDN_BASE_URL'),
} as const

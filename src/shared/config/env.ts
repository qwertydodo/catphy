const requireEnv = (key: string, value: string | undefined): string => {
  if (!value) throw new Error(`${key} is not defined`)
  return value
}

export const env = {
  catApiBaseUrl: requireEnv('VITE_CAT_API_BASE_URL', import.meta.env.VITE_CAT_API_BASE_URL),
  catCdnBaseUrl: requireEnv('VITE_CAT_CDN_BASE_URL', import.meta.env.VITE_CAT_CDN_BASE_URL),
} as const

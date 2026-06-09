const catApiBaseUrl = import.meta.env.VITE_CAT_API_BASE_URL as string | undefined
if (!catApiBaseUrl) throw new Error('VITE_CAT_API_BASE_URL is not defined')

export const env = {
  catApiBaseUrl,
} as const

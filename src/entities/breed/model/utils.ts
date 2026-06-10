import { env } from '../../../shared/config/env'

export const getBreedImageUrl = (referenceImageId: string): string =>
  `${env.catCdnBaseUrl}/${referenceImageId}.jpg`

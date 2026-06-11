import type { LimitParams } from '../../../shared/types/api'
import type { Breed } from '../../breed'

export type CatImage = {
  id: string
  url: string
  width: number
  height: number
  breeds: Breed[]
}

export type Favorite = {
  id: number
  image_id: string
  image: {
    id: string
    url: string
  }
  created_at: string
}

export type CatSearchParams = LimitParams & {
  breed_ids?: string
}

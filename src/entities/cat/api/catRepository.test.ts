import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../../shared/api/catApiClient', () => ({
  catApiClient: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}))

import { catApiClient } from '../../../shared/api/catApiClient'
import { catRepository } from './catRepository'

const mockImage = {
  id: 'abc',
  url: 'https://cdn2.thecatapi.com/images/abc.jpg',
  width: 800,
  height: 600,
  breeds: [],
}
const mockFavorite = {
  id: 1,
  image_id: 'abc',
  image: { id: 'abc', url: 'https://cdn2.thecatapi.com/images/abc.jpg' },
  created_at: '2024-01-01',
}

afterEach(() => vi.clearAllMocks())

describe('catRepository', () => {
  it('getAll fetches images with params', async () => {
    vi.mocked(catApiClient.get).mockResolvedValue({ data: [mockImage] })
    const result = await catRepository.getAll({ page: 0, limit: 9 })
    expect(catApiClient.get).toHaveBeenCalledWith('/images/search', {
      params: { page: 0, limit: 9, order: 'RANDOM' },
    })
    expect(result).toEqual([mockImage])
  })

  it('getFavorites returns favorite list', async () => {
    vi.mocked(catApiClient.get).mockResolvedValue({ data: [mockFavorite] })
    const result = await catRepository.getFavorites()
    expect(catApiClient.get).toHaveBeenCalledWith('/favourites')
    expect(result).toEqual([mockFavorite])
  })

  it('addFavorite posts image id', async () => {
    vi.mocked(catApiClient.post).mockResolvedValue({ data: { id: 1 } })
    const result = await catRepository.addFavorite('abc')
    expect(catApiClient.post).toHaveBeenCalledWith('/favourites', { image_id: 'abc' })
    expect(result).toEqual({ id: 1 })
  })

  it('removeFavorite deletes by favorite id', async () => {
    vi.mocked(catApiClient.delete).mockResolvedValue({ data: {} })
    await catRepository.removeFavorite(1)
    expect(catApiClient.delete).toHaveBeenCalledWith('/favourites/1')
  })
})

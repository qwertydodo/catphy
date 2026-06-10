import { afterEach, describe, expect, it, vi } from 'vitest'
import { breedRepository } from './breedRepository'

vi.mock('../../../shared/api/catApiClient', () => ({
  catApiClient: {
    get: vi.fn(),
  },
}))

import { catApiClient } from '../../../shared/api/catApiClient'

const mockBreed = {
  id: 'abys',
  name: 'Abyssinian',
  description: 'A curious cat',
  temperament: 'Active, Energetic',
  origin: 'Egypt',
  life_span: '14 - 15',
  weight: { imperial: '7 - 10', metric: '3 - 5' },
}

afterEach(() => vi.clearAllMocks())

describe('breedRepository', () => {
  it('getAll returns array of breeds', async () => {
    vi.mocked(catApiClient.get).mockResolvedValue({ data: [mockBreed] })
    const result = await breedRepository.getAll()
    expect(catApiClient.get).toHaveBeenCalledWith('/breeds')
    expect(result).toEqual([mockBreed])
  })

  it('getById returns single breed', async () => {
    vi.mocked(catApiClient.get).mockResolvedValue({ data: mockBreed })
    const result = await breedRepository.getById('abys')
    expect(catApiClient.get).toHaveBeenCalledWith('/breeds/abys')
    expect(result).toEqual(mockBreed)
  })
})

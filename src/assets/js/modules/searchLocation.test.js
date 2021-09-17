// Module
import searchLocation from '@/assets/js/modules/searchLocation'
// API
import { getPlaceByCoord } from '@/assets/js/api/metaweather'
// API response mocks
import { coord as coordResponse, query as queryResponse } from '@test/jest/__mocks__/apiResponse'

// Mock
const fakeCoordsObj = {
  coords: {
    accuracy: 109,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 51.0272883,
    longitude: -114.3680133,
    speed: null
  }
}

// Mock API
jest.mock('@/assets/js/api/metaweather', () => {
  // Response mock
  const mocks = require('@test/jest/__mocks__/apiResponse')

  return {
    getPlaceByCoord: jest.fn().mockReturnValueOnce(mocks.coord),
    getPlacesByQuery: jest.fn().mockReturnValueOnce(mocks.query)
  }
})

describe('searchLocation.js', () => {
  test('should throw and error when data is incorrect', () => {
    const error = new Error('Invalid data')

    expect(() => searchLocation(123)).toThrowError(error)
    expect(() => searchLocation({})).toThrowError(error)
  })

  test('should search by coords', () => {
    const result = searchLocation(fakeCoordsObj)

    expect(result).toMatchObject(coordResponse)
  })

  test('should search by string', () => {
    const result = searchLocation('cal')

    expect(result).toMatchObject(queryResponse)
  })
})
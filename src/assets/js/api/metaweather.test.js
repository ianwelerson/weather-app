// API
import { getPlacesByQuery, getPlaceByWoeid, getPlaceByCoord } from '@/assets/js/api/metaweather'
// API response mocks
import { woeid as woeidResponse, coord as coordResponse, query as queryResponse } from '@test/jest/__mocks__/apiResponse'

// Fetch mocks
global.fetch = jest.fn()
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(woeidResponse),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(coordResponse),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(queryResponse),
  }))

// Values
const woeid = 8775
const coord = {
  lat: 51.0272883,
  long: -114.3680133
}
const query = 'cal'

describe('metaweather.js', () => {
  test('should get a location by woeid', async () => {
    // Getting the location by woeid
    const result = await getPlaceByWoeid(woeid)

    // Check if the correct endpoint was called
    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`/location/${woeid}`)))

    // Check if the return value is correct
    expect(result).toEqual(woeidResponse)
  })

  test('should get a location by coord', async () => {
    // Getting the location by coord
    const result = await getPlaceByCoord(coord)

    // Check if the correct endpoint was called
    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`/location/search/\\?lattlong=${coord.lat},${coord.long}`)))

    // Check if the return value is correct
    expect(result).toEqual(coordResponse)
  })

  test('should get a location by query', async () => {
    // Getting the location by coord
    const result = await getPlacesByQuery(query)

    // Check if the correct endpoint was called
    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`/location/search/\\?query=${query}`)))

    // Check if the return value is correct
    expect(result).toEqual(queryResponse)
  })
})
// Module
import { loadLocation } from '@/assets/js/modules/loadLocation'
// API response mocks
import { woeid as woeidResponse } from '@test/jest/__mocks__/apiResponse'

// Imports for mock
import { getPlaceByWoeid } from '@/assets/js/api/metaweather'
import renderContent from '@/assets/js/modules/renderContent'

// Mocks
jest.mock('@/assets/js/modules/renderContent', () => {
  return jest.fn()
})
jest.mock('@/assets/js/api/metaweather', () => {
  // Response mock
  const mocks = require('@test/jest/__mocks__/apiResponse')

  return {
    getPlaceByWoeid: jest.fn().mockReturnValueOnce(mocks.woeid)
  }
})

// Woeid
const woeid = 8775

describe('loadLocation.js', () => {
  test('should throw an error if woeid is not received', async () => {
    await expect(loadLocation()).resolves.toThrow(/Invalid data/)
  })

  test('should call the API module and the render module using woeid received', async () => {
    const response = await loadLocation(woeid)

    expect(getPlaceByWoeid).toHaveBeenCalledWith(woeid)
    expect(renderContent).toHaveBeenCalledWith(woeidResponse)
    expect(response).toMatchObject(woeidResponse)
  })

  test('should save woeid in localStorage', async () => {
    await loadLocation(woeid)

    expect(window.localStorage.getItem('woeid')).toBe(String(woeid))
  })
})
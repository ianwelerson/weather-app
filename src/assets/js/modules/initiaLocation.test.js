// Module
import initialLocation from '@/assets/js/modules/initialLocation'
// Mock
import { loadLocation } from '@/assets/js/modules/loadLocation'
jest.mock('@/assets/js/modules/loadLocation', () => {
  return {
    loadLocation: jest.fn()
  }
})

describe('initialLocation.js', () => {
  test('should use the default location', () => {
    initialLocation()

    expect(loadLocation).toHaveBeenCalledWith(8775)
  })

  test('should use the provided location', () => {
    const woeid = 12578891
    initialLocation(woeid)

    expect(loadLocation).toHaveBeenCalledWith(woeid)
  })

  test('should use localStore location', () => {
    const location = 455825
    window.localStorage.setItem('woeid', location)

    initialLocation()

    expect(loadLocation).toHaveBeenCalledWith(location)
  })

  test('should use url woeid param', () => {
    const woeid = 455827

    // Location mock
    delete window.location
    window.location = new URL(`https://www.mysite.com?woeid=${woeid}`)

    initialLocation()

    expect(loadLocation).toHaveBeenCalledWith(woeid)
  })
})
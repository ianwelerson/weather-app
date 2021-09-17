import requestUserLocation from '@/assets/js/modules/requestUserLocation'

// Success location mock
const sucessLocation = {
  coords: {
    latitude: 51.0272883,
    longitude: -114.3680133,
  },
}

// Error mock
const errorLocation = {
  code: 1,
  message: 'GeoLocation Error',
}

describe('requestUserLocation.js', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should throw error if the browser does\'t support geolocation', () => {
    const locationCallback = jest.fn()
    expect(() => requestUserLocation(locationCallback)).toThrow()
  })
  
  describe('mocked geolocation', () => {
    beforeAll(() => {
      /**
       * Mock Geolocation API
       * First call: Sucess - return position
       * Second call: Error - return error
       */
      global.navigator.geolocation = {
        getCurrentPosition: jest.fn()
          .mockImplementationOnce(
            success => Promise.resolve(
              success(sucessLocation)
            )
          )
          .mockImplementationOnce(
            error => Promise.resolve(
              error(errorLocation)
            )
          ),
      }
    })

    test('should trigger callback with the success location', () => {
      const locationCallback = jest.fn()
  
      requestUserLocation(locationCallback)
    
      expect(locationCallback).toHaveBeenCalledWith(sucessLocation)
    })
  
    test('should receive an error', () => {
      const locationCallback = jest.fn()
  
      requestUserLocation(locationCallback)
    
      expect(locationCallback).toHaveBeenCalledWith(errorLocation)
    })
  })
})

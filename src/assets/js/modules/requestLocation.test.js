import requestLocation from '@/assets/js/modules/requestLocation.js'

describe('requestLocation.js', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should return false if browser does\'t support geolocation', () => {
    const locationCallback = jest.fn()
    const locationResponse = requestLocation(locationCallback)
  
    expect(locationResponse).toBeFalsy()
  })
  
  describe('mocked geolocation', () => {
    // Location returns
    const sucessLocation = {
      coords: {
        latitude: 51.0272883,
        longitude: -114.3680133,
      },
    }
  
    const errorLocation = {
      code: 1,
      message: 'GeoLocation Error',
    }
      
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

    test('should receive the correct location', () => {
      const locationCallback = jest.fn()
  
      requestLocation(locationCallback)
    
      expect(locationCallback).toHaveBeenCalledWith(sucessLocation)
    })
  
    test('should receive an error', () => {
      const locationCallback = jest.fn()
  
      requestLocation(locationCallback)
    
      expect(locationCallback).toHaveBeenCalledWith(errorLocation)
    })
  })
})

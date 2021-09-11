// Module
import createListener from '@/assets/js/modules/createListener'

// Render the HTML page
import '@test/jest/helpers/renderHtmlPage'

// Default event
const eventDefault = {
  eventName: 'click',
  elementId: 'location-button'
}

describe('createListener.js', () => {
  describe('required values', () => {
    test('should throw an error if some value is missing', () => {
      expect(() => createListener({
        ...eventDefault,
      })).toThrowError()
    })

    test('should throw an error if element is not found', () => {
      expect(() => createListener({
        ...eventDefault,
        elementId: 'mmms',
        callback: jest.fn()
      })).toThrowError()
    })

    test('should return true if all values are received', () => {
      const createResult = createListener({
        ...eventDefault,
        callback: jest.fn()
      })
    
      expect(createResult).toBeTruthy()
    })
  })
  
  test('should trigger the callback', () => {
    const fakeCallback = jest.fn()
  
    createListener({
      ...eventDefault,
      callback: fakeCallback
    })
  
    document.getElementById(eventDefault.elementId).click()
  
    expect(fakeCallback).toHaveBeenCalledTimes(1)
  })
})
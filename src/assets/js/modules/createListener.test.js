// Render the HTML page
import 'root/test/jest/helpers/renderHtmlPage'

// Module
import createListener from '@/assets/js/modules/createListener.js'

// Default event
const eventDefault = {
  eventName: 'click',
  elementId: 'location-button'
}

describe('required values', () => {
  test('should return true if all values are received', () => {
    const fakeCallback = jest.fn()
  
    const createResult = createListener({
      ...eventDefault,
      callback: fakeCallback
    })
  
    expect(createResult).toBeTruthy()
  })

  test('should return false if some value is missing', () => {
    const fakeCallback = jest.fn()
  
    const createResult = createListener({
      ...eventDefault,
    })
  
    expect(createResult).toBeFalsy()
  })
})

test('should trigger the callback when event occurs', () => {
  const fakeCallback = jest.fn()

  const createResult = createListener({
    ...eventDefault,
    callback: fakeCallback
  })

  document.getElementById(eventDefault.elementId).click()

  expect(fakeCallback).toHaveBeenCalledTimes(1)
})
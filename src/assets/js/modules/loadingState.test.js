// Module
import loadingState from '@/assets/js/modules/loadingState'
// Render page
import '@test/jest/helpers/renderHtmlPage'

describe('loadingState.js', () => {
  test('should have true as default state', () => {
    expect(loadingState.get()).toBe(true)
  })

  test('should throw and error if set not receives a boolean', () => {
    expect(() => loadingState.set('a')).toThrowError(new Error('The values must be a boolean'))
  })

  test('should all loading elements be visible', () => {
    const defaultLoading = document.querySelectorAll('[data-loading=skeleton].skeleton-load--loaded')

    expect(defaultLoading.length).toBe(0)
  })

  test('should change state to not loading', () => {
    const toggleLoading = jest.fn()

    loadingState.set(false)

    expect(loadingState.get()).toBe(false)
    expect(document.querySelectorAll('[data-loading=skeleton].skeleton-load--loaded').length).not.toBe(0)
  })

  test('should change state to loading', () => {
    const toggleLoading = jest.fn()

    loadingState.set(true)

    expect(loadingState.get()).toBe(true)
    expect(document.querySelectorAll('[data-loading=skeleton].skeleton-load--loaded').length).toBe(0)
  })
})

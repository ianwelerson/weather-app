// Render page
import '@test/jest/helpers/renderHtmlPage'
// Module
import sideSearch from '@/assets/js/modules/sideSearch'
// Mock
import { query } from '@test/jest/__mocks__/apiResponse'

// Mocks
import loadLocation from '@/assets/js/modules/loadLocation'
jest.mock('@/assets/js/modules/loadLocation', () => {
  return jest.fn()
})

describe('sideSearch.js', () => {
  test('should open side search', () => {
    sideSearch.open()

    const element = document.getElementById('side-search')

    expect(element.classList.contains('home__menu--closed')).toBeFalsy()
  })

  test('should close side search', () => {
    sideSearch.close()

    const element = document.getElementById('side-search')

    expect(element.classList.contains('home__menu--closed')).toBeTruthy()
  })

  test('should render a list of locations and clear items before render again', () => {
    sideSearch.open()
    sideSearch.listLocations(query)

    const wrapper = document.getElementById('location-list')

    // First render
    expect(wrapper.querySelectorAll('li').length).toBe(2)

    // Second render
    sideSearch.listLocations(query)
    expect(wrapper.querySelectorAll('li').length).toBe(2)
  })

  test('should call the load location', () => {
    sideSearch.listLocations(query)

    const locationButton = document.getElementById(`woeid-${query[0].woeid}`)

    locationButton.click()

    expect(loadLocation).toHaveBeenCalledTimes(1)
  })
})
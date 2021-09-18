// Render page
import '@test/jest/helpers/renderHtmlPage'
// Module
import sideMenu from '@/assets/js/modules/sideMenu'
// Mock
import { query } from '@test/jest/__mocks__/apiResponse'

// Mocks
import loadLocation from '@/assets/js/modules/loadLocation'
jest.mock('@/assets/js/modules/loadLocation', () => {
  return jest.fn()
})

describe('sideMenu.js', () => {
  test('should open side search', () => {
    sideMenu.open()

    const element = document.getElementById('side-menu')

    expect(element.classList.contains('home__menu--closed')).toBeFalsy()
  })

  test('should close side search', () => {
    sideMenu.close()

    const element = document.getElementById('side-menu')

    expect(element.classList.contains('home__menu--closed')).toBeTruthy()
  })

  test('should render a list of locations and clear items before render again', () => {
    sideMenu.open()
    sideMenu.listLocations(query)

    const wrapper = document.getElementById('location-list')

    // First render
    expect(wrapper.querySelectorAll('li').length).toBe(2)

    // Second render
    sideMenu.listLocations(query)
    expect(wrapper.querySelectorAll('li').length).toBe(2)
  })

  test('should call the load location', () => {
    sideMenu.open()
    sideMenu.listLocations(query)

    const locationButton = document.getElementById(`woeid-${query[0].woeid}`)

    locationButton.click()

    expect(loadLocation).toHaveBeenCalledTimes(1)
  })

  test('should close the menu when a location is chosen', () => {
    sideMenu.open()
    sideMenu.listLocations(query)

    const locationButton = document.getElementById(`woeid-${query[0].woeid}`)
    const menuElement = document.getElementById('side-menu')

    locationButton.click()

    expect(loadLocation).toHaveBeenCalledTimes(1)
    expect(menuElement.classList.contains('home__menu--closed')).toBeTruthy()
  })
})
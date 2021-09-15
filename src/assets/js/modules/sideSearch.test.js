// Render page
import '@test/jest/helpers/renderHtmlPage'
// Module
import sideSearch from '@/assets/js/modules/sideSearch'

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
})
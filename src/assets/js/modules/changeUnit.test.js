// Render page
import '@test/jest/helpers/renderHtmlPage'
// Module
import changeUnit from '@/assets/js/modules/changeUnit'

describe('changeUnit.js', () => {
  test('should be Celsius as default', () => {
    const celsiusBtn = document.getElementById('change-unit-celsius')
    expect(celsiusBtn.classList.contains('button--selected')).toBeTruthy()
  })
  
  test('should throw an error if value is invalid', () => {
    expect(() => changeUnit('a')).toThrowError(new Error('Invalid format'))
  })

  test('should change button classes when unit changes', () => {
    changeUnit('f')

    const fahrenheitBtn = document.getElementById('change-unit-fahrenheit')
    expect(fahrenheitBtn.classList.contains('button--selected')).toBeTruthy()
  })

  test('should set unit into localStorage', () => {
    const value = 'f'
    changeUnit(value)

    expect(window.localStorage.getItem('unit')).toBe(value)
  })
})

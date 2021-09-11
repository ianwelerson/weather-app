
// Module
import renderContent from '@/assets/js/modules/renderContent'
// Helpers
import { formatDate, iconUrl, tempFormat } from '@/assets/js/helpers/main'
// API response mocks
import { woeid as woeidResponse } from '@test/jest/__mocks__/apiResponse'
// Render page
import '@test/jest/helpers/renderHtmlPage'

// Today weather obj
const todayWeather = woeidResponse.consolidated_weather[0]

describe('renderContent.js', () => {
  beforeEach(() => {
    renderContent(woeidResponse)
  })

  describe('main forecast', () => {
    test('should render correct icon and set the correct class', () => {
      const iconBlock = document.getElementById('main-forecast-icon')
      const iconElement = iconBlock.querySelector('img')
      
      // Check if the block has cloud class, because the weather is cloudy
      expect(iconBlock.classList.contains('state-image--show-cloud')).toBe(true)
      // Check icon attrs
      expect(iconElement.src).toBe(iconUrl(todayWeather.weather_state_abbr))
      expect(iconElement.alt).toBe(todayWeather.weather_state_name)
    })

    test('should render today weather values', () => {
      const temperatureElement = document.getElementById('main-forecast-temperature')
      const unitElement = document.getElementById('main-forecast-unit')
      const nameElement = document.getElementById('main-forecast-name')

      const formattedValue = tempFormat({
        value: todayWeather.the_temp,
        current: 'c',
        required: 'same'
      })

      expect(temperatureElement.innerText).toBe(String(formattedValue.value))
      expect(unitElement.innerText).toBe(formattedValue.unit)
      expect(nameElement.innerText).toBe(todayWeather.weather_state_name)
    })

    test('should render location and date', () => {
      const dateElement = document.getElementById('main-forecast-date')
      const locationElement = document.getElementById('main-forecast-location')

      expect(dateElement.innerText).toBe(formatDate(todayWeather.created))
      expect(locationElement.innerText).toBe(woeidResponse.title)
    })
  })

  describe('aditional forecast', () => {
    describe('next days forecast', () => {
      test('should render next days forecast', () => {
        const forecastsBlock = document.querySelectorAll('[data-testid=one-day-forecast]')

        // Get one forecast for test
        const secondDayData = woeidResponse.consolidated_weather[2]
        const secondDayElement = forecastsBlock[1]
        
        // Check if five day forecast is rendered
        expect(forecastsBlock.length).toBe(5)

        // Check if second day data is valid
        expect(secondDayElement.querySelector('.title__text').innerText).toBe(formatDate(secondDayData.applicable_date))
        expect(secondDayElement.querySelector('.icon__image').src).toBe(iconUrl(secondDayData.weather_state_abbr))
        expect(secondDayElement.querySelector('.icon__image').alt).toBe(secondDayData.weather_state_name)

        // Check if tomorrow title is valid
        // expect(secondDayElement.querySelector('.title__text').innerText).toBe(formatDate(secondDayData.applicable_date))
      })
    })
  })
})
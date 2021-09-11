// Module
import loadLocation from '@/assets/js/modules/loadLocation'
// Helpers
import { formatDate, iconUrl } from '@/assets/js/helpers/main'
// API response mocks
import { woeid as woeidResponse } from '@test/jest/__mocks__/apiResponse'
// Render page
import '@test/jest/helpers/renderHtmlPage'

// Fetch Mock
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(woeidResponse),
}))

// Woeid
const woeid = 8775
// Today weather obj
const todayWeather = woeidResponse.consolidated_weather[0]

describe('loadLocation.js', () => {
  test('should get a location by woeid', async () => {
    // Getting the location
    const result = await loadLocation(woeid)

    // TODO: Refact to test only the loadLocation
    // Check if the correct endpoint was called
    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`/location/${woeid}`)))

    // Check if the return value is correct
    expect(result).toEqual(woeidResponse)
  })

  describe('page content render', () => {
    beforeEach(async () => {
      // Load location
      await loadLocation(woeid)
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
        const nameElement = document.getElementById('main-forecast-name')
  
        expect(temperatureElement.innerText).toBe(String(Math.round(todayWeather.the_temp * 10) / 10))
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
})
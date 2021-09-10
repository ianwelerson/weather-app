// Module
import loadLocation from '@/assets/js/modules/loadLocation.js'
// Helpers
import { formatDate, iconUrl } from '@/assets/js/helpers/main'
// API response Mocks
import { woeid as woeidResponse } from '@test/jest/__mocks__/apiResponse'
// Page render
import '@test/jest/helpers/renderHtmlPage'


// Fetch Mock
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(woeidResponse),
}))

// Woeid
const woeid = 8775
const todayWeather = woeidResponse.consolidated_weather[0]

describe('loadLocation.js', () => {
  test('should get a location by woeid', async () => {
    const result = await loadLocation(woeid)
    // Check if the correct endpoint was called
    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`/location/${woeid}`)))

    // Check if the return is correct
    expect(result).toEqual(woeidResponse)
  })

  describe('render page content', () => {
    beforeEach(async () => {
      await loadLocation(woeid)
    })

    describe('today weather', () => {
      test('should render icon', () => {
        const iconBlock = document.getElementById('weather-icon')
        const iconImage = iconBlock.querySelector('img')
    
        expect(iconBlock.classList.contains('state-image--show-cloud')).toBe(true)
        expect(iconImage.src).toBe(`https://www.metaweather.com/static/img/weather/${todayWeather.weather_state_abbr}.svg`)
        expect(iconImage.alt).toBe(todayWeather.weather_state_name)
      })
  
      test('should render today weather', () => {
        const temperatureElement = document.getElementById('weather-today-temperature')
        const nameElement = document.getElementById('weather-today-name')
  
        expect(temperatureElement.innerText).toBe(String(Math.round(todayWeather.the_temp * 10) / 10))
        expect(nameElement.innerText).toBe(todayWeather.weather_state_name)
      })
  
      test('should render location and date', () => {
        const dateElement = document.getElementById('weather-date')
        const locationElement = document.getElementById('weather-location')

        expect(dateElement.innerText).toBe(formatDate(todayWeather.created))
        expect(locationElement.innerText).toBe(woeidResponse.title)
      })
    })

    describe('next days forecast', () => {
      test('should render next days forecast', () => {
        const forecastsBlock = document.querySelectorAll('[data-testid=day-forecast]')
        const tomorrowData = woeidResponse.consolidated_weather[1]
        const tomorrowElement = forecastsBlock[0]

        expect(forecastsBlock.length).toBe(5)
        expect(tomorrowElement.querySelector('.title__text').innerText).toBe(formatDate(tomorrowData.applicable_date))
        expect(tomorrowElement.querySelector('.icon__image').src).toBe(iconUrl(tomorrowData.weather_state_abbr))
        expect(tomorrowElement.querySelector('.icon__image').alt).toBe(tomorrowData.weather_state_name)
      })
    })
  })
})
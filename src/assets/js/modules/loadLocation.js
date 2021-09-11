import { getPlaceByWoeid } from '@/assets/js/api/metaweather.js'
import { formatDate, iconUrl } from '@/assets/js/helpers/main'

async function loadLocation (woeid) {
  if (!woeid) {
    throw new Error('Invalid data')
  }

  try {
    const response = await getPlaceByWoeid(woeid)
    renderPageContent(response)
    return response
  } catch (error) {
    throw error
  }
}

function renderPageContent (data) {
  const todayForecast = data.consolidated_weather[0]

  // Today
  renderTodayForecastIcon(todayForecast)
  renderTodayForecastData(todayForecast)

  // Aditional data
  renderForecastDataLocation(data)

  // Next days
  renderNextDaysForecast(data.consolidated_weather.slice(1))
}

function renderTodayForecastIcon (todayWeather) {
  const iconBlock = document.getElementById('main-forecast-icon')
  const iconImage = iconBlock.querySelector('img')

  // Setting the clody class
  if (['sn', 'sl', 'h', 't', 'hr', 'lr', 's', 'hc', 'lc'].includes(todayWeather.weather_state_abbr)) {
    iconBlock.classList.add('state-image--show-cloud')
  }

  iconImage.src = iconUrl(todayWeather.weather_state_abbr)
  iconImage.alt = todayWeather.weather_state_name
}

function renderTodayForecastData (todayWeather) {
  const temperatureElement = document.getElementById('main-forecast-temperature')
  const nameElement = document.getElementById('main-forecast-name')

  // TODO: Create temperature helper
  temperatureElement.innerText = String(Math.round(todayWeather.the_temp * 10) / 10)
  nameElement.innerText = todayWeather.weather_state_name
}

function renderForecastDataLocation (data) {
  const dateElement = document.getElementById('main-forecast-date')
  const locationElement = document.getElementById('main-forecast-location')

  dateElement.innerText = formatDate(data.consolidated_weather[0].created)
  locationElement.innerText = data.title
}

function renderNextDaysForecast (nextDays) {
  const forecastsBlock = document.getElementById('next-days-forecast-block')
  const forecastTemplate = document.getElementById('next-day-forecast-template')
  
  nextDays.forEach(forecast => {
    const newForecast = forecastTemplate.content.cloneNode(true)

    // TODO: Add tomorrow as a title
    newForecast.querySelector('.title__text').innerText = formatDate(forecast.applicable_date)
    // Icon
    newForecast.querySelector('.icon__image').src = iconUrl(forecast.weather_state_abbr)
    newForecast.querySelector('.icon__image').alt = forecast.weather_state_name

    forecastsBlock.appendChild(newForecast)
  })
}

export default loadLocation

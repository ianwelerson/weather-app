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
  // Today
  renderIcon(data.consolidated_weather[0])
  renderTodayWeather(data.consolidated_weather[0])
  renderDateLocation(data)

  // Next days
  renderForecastForNextDays(data.consolidated_weather.slice(1))
}

function renderIcon (todayWeather) {
  const iconBlock = document.getElementById('weather-icon')
  const iconImage = iconBlock.querySelector('img')

  if (['sn', 'sl', 'h', 't', 'hr', 'lr', 's', 'hc', 'lc'].includes(todayWeather.weather_state_abbr)) {
    iconBlock.classList.add('state-image--show-cloud')
  }

  iconImage.src = `https://www.metaweather.com/static/img/weather/${todayWeather.weather_state_abbr}.svg`
  iconImage.alt = todayWeather.weather_state_name
}

function renderTodayWeather (todayWeather) {
  const temperatureElement = document.getElementById('weather-today-temperature')
  const nameElement = document.getElementById('weather-today-name')

  temperatureElement.innerText = String(Math.round(todayWeather.the_temp * 10) / 10)
  nameElement.innerText = todayWeather.weather_state_name
}

function renderDateLocation (data) {
  const dateElement = document.getElementById('weather-date')
  const locationElement = document.getElementById('weather-location')

  dateElement.innerText = formatDate(data.consolidated_weather[0].created)
  locationElement.innerText = data.title
}

function renderForecastForNextDays (nextDays) {
  const forecastsBlock = document.getElementById('next-days-forecast-block')
  const forecastTemplate = document.getElementById('next-day-forecast-template')
  
  nextDays.forEach(forecast => {
    const newForecast = forecastTemplate.content.cloneNode(true)

    // TODO: Add tomorrow as a title
    newForecast.querySelector('.title__text').innerText = formatDate(forecast.applicable_date)
    newForecast.querySelector('.icon__image').src = iconUrl(forecast.weather_state_abbr)
    newForecast.querySelector('.icon__image').alt = forecast.weather_state_name

    forecastsBlock.appendChild(newForecast)
  })
}

export default loadLocation
import { formatDate, iconUrl, tempFormat } from '@/assets/js/helpers/main'

function renderContent (data) {
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
  const unitElement = document.getElementById('main-forecast-unit')
  const nameElement = document.getElementById('main-forecast-name')

  const tempFormatted = tempFormat({
    value: todayWeather.the_temp,
    current: 'c',
    required: 'same'
  })

  temperatureElement.innerText = String(tempFormatted.value)
  unitElement.innerText = tempFormatted.unit
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

export default renderContent
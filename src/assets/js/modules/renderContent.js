import { formatDate, iconUrl, tempFormat } from '@/assets/js/helpers/main'

function renderContent (data) {
  const todayForecast = data.consolidated_weather[0]

  // Clear
  clearOldForecast()

  // Today
  renderTodayForecastIcon(todayForecast)
  renderTodayForecastData(todayForecast)

  // Aditional data
  renderForecastDataLocation(data)

  // Next days
  renderNextDaysForecast(data.consolidated_weather.slice(1))

  // Hight lights
  renderTodayHightlights(todayForecast)
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

    newForecast.querySelector('.title__text').innerText = cardTitle(forecast.applicable_date)
    newForecast.querySelector('.temperature__max').innerText = tempFormat({
        value: forecast.max_temp,
        current: 'c',
        required: 'same'
      }).text
    newForecast.querySelector('.temperature__min').innerText = tempFormat({
        value: forecast.min_temp,
        current: 'c',
        required: 'same'
      }).text
    // Icon
    newForecast.querySelector('.icon__image').src = iconUrl(forecast.weather_state_abbr)
    newForecast.querySelector('.icon__image').alt = forecast.weather_state_name

    forecastsBlock.appendChild(newForecast)
  })
}

function renderTodayHightlights (today) {
  // Wind
  const windSpeed = document.getElementById('hightlights-wind-speed')
  windSpeed.innerText = today.wind_speed.toFixed(2)
  const windDirectArrow = document.getElementById('hightlights-wind-direction-arrow')
  windDirectArrow.style.transform = `rotate(${today.wind_direction}deg)`
  const windDirectCompass = document.getElementById('hightlights-wind-direction-compass')
  windDirectCompass.innerText = today.wind_direction_compass

  // Humidity
  const humidityValue = document.getElementById('hightlight-humidity-number')
  const humidityPercent = document.getElementById('hightlight-humidity-percent')
  humidityValue.innerText = today.humidity
  humidityPercent.style.width = `${today.humidity}%`

  // Visiblity
  const visibilityValue = document.getElementById('hightlight-visibility-number')
  visibilityValue.innerText = today.visibility.toFixed(2)

  // Air Pressure
  const airPressureValue = document.getElementById('hightlight-air-pressure-number')
  airPressureValue.innerText = today.air_pressure
}

// Local helpers
function cardTitle (date) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date === tomorrow.toISOString().split('T')[0]) {
    return 'Tomorrow'
  }

  return formatDate(date)
}

function clearOldForecast () {
  // Next days
  const nextDaysBlock = document.getElementById('next-days-forecast-block')

  nextDaysBlock.querySelectorAll('.day-forecast').forEach(element => {
    element.remove()
  })
}

export default renderContent
import { getPlacesByQuery } from '@/assets/js/api/metaweather'

// Const
const menuClosedCLass = 'home__menu--closed'
const locationListId = 'location-list'
const searchFormId = 'search-form'

/**
 * Create a event listener based on id and action received
 */
function createMenuAction ({ id, action }) {
  document.getElementById(id).addEventListener('click', () => {
    document.getElementById('side-menu').classList[action](menuClosedCLass)
  })
}

/**
 * Find a place using the Weather API
 */
function searchLocation (location) {
  setFormLoading(true)

  getPlacesByQuery(location).then((data) => {
    renderLocationList(data)
  }).finally(() => {
    setFormLoading(false)
  })
}

/**
 * Render a list of places
 */
function renderLocationList (locations) {
  const locationTemplate = document.getElementById('location-template')
  const locationList = document.getElementById(locationListId)

  clearListItems()

  locations.forEach(location => {
    const templateClone = locationTemplate.content.cloneNode(true)

    templateClone.querySelector('.location-action__name').innerText = location.title
    templateClone.querySelector('.location-action').setAttribute('href', `?woeid=${location.woeid}`)

    locationList.appendChild(templateClone)
  })
}

/**
 * Clear all items in result list
 */
function clearListItems () {
  const locationList = document.getElementById(locationListId)
  const listElements = locationList.querySelectorAll('li')

  listElements.forEach(element => {
    element.remove()
  })
}

/**
 * Set the form state to loading
 */
function setFormLoading (state = false) {
  const formBlock = document.getElementById(searchFormId)
  const button = formBlock.querySelector('[type=submit]')
  const input = formBlock.querySelector('input')

  // Classes
  const buttonClass = 'button--loading'
  const inputClass = 'input-group__element--disabled'

  if (state) {
    button.classList.add(buttonClass)
    input.classList.add(inputClass)
    input.setAttribute('disabled', true)

    return
  }

  button.classList.remove(buttonClass)
  input.classList.remove(inputClass)
  input.setAttribute('disabled', false)
}

/**
 * Create events and setup search functionality
 */
function bootstrapSearchBar () {
  // Menu listeners
  createMenuAction({
    id: 'open-side-menu',
    action: 'remove'
  })

  createMenuAction({
    id: 'close-side-menu',
    action: 'add'
  })

  // Form listener
  document.getElementById(searchFormId).addEventListener('submit', (event) => {
    event.preventDefault()

    const location = event.target.querySelector('input').value

    searchLocation(location)
  })
}

export default bootstrapSearchBar

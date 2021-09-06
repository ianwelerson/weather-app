import { getPlacesByQuery } from '@/assets/js/api/metaweather'

// Const
const menuClosedCLass = 'home__menu--closed'

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
document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault()

  const location = event.target.querySelector('input').value

  serachLocation(location)
})

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
function serachLocation (location) {
  getPlacesByQuery(location).then((data) => {
    renderLocationList(data)
  })
}

/**
 * Render a list of places
 */
function renderLocationList (locations) {
  const locationTemplate = document.getElementById('location-template')
  const locationList = document.getElementById('location-list')

  locations.map(location => {
    // const templateClone = locationTemplate.cloneNode(false)
    // console.log(templateClone)
    // templateClone.querySelector('location-action__name').innerText = location.locationTemplate

    // locationList.appendChild(document.importNode(locationTemplate, true))
    return location
  })
}

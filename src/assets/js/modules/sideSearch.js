import loadLocation from '@/assets/js/modules/loadLocation'

const locationListId = 'location-list'

const sideSearch = {
  open() {
    const element = document.getElementById('side-search')
    element.classList.remove('home__menu--closed')
  },
  close() {
    const element = document.getElementById('side-search')
    element.classList.add('home__menu--closed')
  },
  listLocations(locations) {
    const locationTemplate = document.getElementById('location-template')
    const locationList = document.getElementById(locationListId)

    // Clear list
    sideSearch.clearLocationList()

    locations.forEach(location => {
      const templateClone = locationTemplate.content.cloneNode(true)
      const elementId = `woeid-${location.woeid}`

      templateClone.querySelector('.location-action__name').innerText = location.title
      templateClone.querySelector('.location-action').setAttribute('data-woeid', location.woeid)
      templateClone.querySelector('.location-action').setAttribute('id', elementId)

      locationList.appendChild(templateClone)
      createLocationListener(elementId)
    })
  },
  clearLocationList() {
    const locationList = document.getElementById(locationListId)
    const locationItems = locationList.querySelectorAll('li')

    locationItems.forEach(element => {
      // TODO: Finish event remove
      // removeLocationListener(element.id)
      element.remove()
    })
  }
}

function loadLocationEvent (event) {
  event.preventDefault()
  loadLocation(event.target.getAttribute('data-woeid'))
}

function createLocationListener (elementId) {
  document.getElementById(elementId).addEventListener('click', loadLocationEvent)
}

function removeLocationListener (elementId) {
  console.log(elementId)
  document.getElementById(elementId).removeEventListener('click', loadLocationEvent)
}

export default sideSearch
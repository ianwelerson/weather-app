import { loadLocation } from '@/assets/js/modules/loadLocation'

const locationListId = 'location-list'
const notFoundMessageId = 'location-not-found'

const sideMenu = {
  open() {
    const element = document.getElementById('side-menu')
    element.classList.remove('home__menu--closed')
  },
  close() {
    const element = document.getElementById('side-menu')
    element.classList.add('home__menu--closed')
  },
  listLocations(locations) {
    const locationTemplate = document.getElementById('location-template')
    const locationList = document.getElementById(locationListId)

    // Clear list
    sideMenu.clearLocationList()

    if (!locations.length) {
      showNotFoundMessage()

      return
    }

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
      removeLocationListener(element)
      element.remove()
    })
  }
}

function loadLocationEvent (event) {
  event.preventDefault()
  loadLocation(event.target.getAttribute('data-woeid'))
  sideMenu.close()
}

function createLocationListener (elementId) {
  document.getElementById(elementId).addEventListener('click', loadLocationEvent)
}

function removeLocationListener (element) {
  const actionElement = element.querySelector('a')

  if (!actionElement) {
    return
  }

  document.getElementById(actionElement.id).removeEventListener('click', loadLocationEvent)
}

function showNotFoundMessage () {
  const notFoundMessage = document.getElementById(notFoundMessageId).content.cloneNode(true)
  const locationList = document.getElementById(locationListId)

  locationList.appendChild(notFoundMessage)
}

export default sideMenu

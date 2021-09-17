import loadLocation from '@/assets/js/modules/loadLocation'

const locationListId = 'location-list'

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

export default sideMenu
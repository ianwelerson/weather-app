// ------- Load CSS ------- 
import '@/assets/scss/main.scss'

// ------- Modules ------- 
import createListener from '@/assets/js/modules/createListener'
import requestUserLocation from '@/assets/js/modules/requestUserLocation'
import initialLocation from '@/assets/js/modules/initialLocation'
import changeUnit from '@/assets/js/modules/changeUnit'
import searchLocation from '@/assets/js/modules/searchLocation'
import sideMenu from '@/assets/js/modules/sideMenu'

// TODO: Skeleton loading
// TODO: Error when try search locations and API fails

// ------- Location load ------- 
initialLocation()

// ------- Create all listeners ------- 
// Request location
createListener({
  eventName: 'click',
  elementId: 'location-button',
  callback: () => {
    requestUserLocation(async (userLocation) => {
      const result = await searchLocation(userLocation)
      sideMenu.listLocations(result)
      sideMenu.open()
    })
  }
})
// Open menu
createListener({
  eventName: 'click',
  elementId: 'open-side-menu',
  callback: () => {
    sideMenu.open()
  }
})
// Close menu
createListener({
  eventName: 'click',
  elementId: 'close-side-menu',
  callback: () => {
    sideMenu.close()
  }
})
// Change unit to C
createListener({
  eventName: 'click',
  elementId: 'change-unit-celsius',
  callback: () => {
    changeUnit('c')
  }
})
// Change unit to F
createListener({
  eventName: 'click',
  elementId: 'change-unit-fahrenheit',
  callback: () => {
    changeUnit('f')
  }
})
// Search form submit
createListener({
  eventName: 'submit',
  elementId: 'search-form',
  callback: async (event) => {
    event.preventDefault()
    const query = event.target.querySelector('input')?.value
    if (!query) {
      return
    }

    const result = await searchLocation(query)
    sideMenu.listLocations(result)
  }
})
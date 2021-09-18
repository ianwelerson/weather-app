// ------- Load CSS ------- 
import '@/assets/scss/main.scss'

// ------- Modules ------- 
import createListener from '@/assets/js/modules/createListener'
import requestUserLocation from '@/assets/js/modules/requestUserLocation'
import { loadLocation } from '@/assets/js/modules/loadLocation'
import searchLocation from '@/assets/js/modules/searchLocation'
import sideMenu from '@/assets/js/modules/sideMenu'

// TODO: Change unit
// TODO: URL Woeid

// ------- Default location ------- 
loadLocation(8775)

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
// Form submit
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
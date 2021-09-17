// Load CSS
import '@/assets/scss/main.scss'

// Modules
import createListener from '@/assets/js/modules/createListener'
import requestUserLocation from '@/assets/js/modules/requestUserLocation'
import loadLocation from '@/assets/js/modules/loadLocation'
import searchLocation from '@/assets/js/modules/searchLocation'
import sideMenu from '@/assets/js/modules/sideMenu'
import { query } from '../../../test/jest/__mocks__/apiResponse'

// // Fake use for location result
// function showSideMenu(data) {
//   console.log(data)
//   console.log(typeof data)
//   sideMenu.open()
//   // Fake list
//   sideMenu.listLocations(query)
// }

// loadLocation(455825)
// // Fake new location set
// setTimeout(() => {
//   loadLocation(8775)
// }, 4000);

// Listeners
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

createListener({
  eventName: 'click',
  elementId: 'open-side-menu',
  callback: () => {
    sideMenu.open()
  }
})

createListener({
  eventName: 'click',
  elementId: 'close-side-menu',
  callback: () => {
    sideMenu.close()
  }
})

createListener({
  eventName: 'submit',
  elementId: 'search-form',
  callback: (event) => {
    event.preventDefault()
    showSideMenu(event.target.querySelector('input').value)
  }
})
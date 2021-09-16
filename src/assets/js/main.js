// Load CSS
import '@/assets/scss/main.scss'

// Modules
import createListener from '@/assets/js/modules/createListener'
import requestLocation from '@/assets/js/modules/requestLocation'
import loadLocation from '@/assets/js/modules/loadLocation'
import sideSearch from '@/assets/js/modules/sideSearch'
import { query } from '../../../test/jest/__mocks__/apiResponse'

// Fake use for location result
function showSideMenu(data) {
  sideSearch.open()
  // Fake list
  sideSearch.listLocations(query)
}

loadLocation(455825)

createListener({
  eventName: 'click',
  elementId: 'location-button',
  callback: () => {
    requestLocation(showSideMenu)
  }
})
// Load CSS
import '@/assets/scss/main.scss'

// Modules
import createListener from '@/assets/js/modules/createListener'
import requestLocation from '@/assets/js/modules/requestLocation'
import loadLocation from '@/assets/js/modules/loadLocation'
import sideSearch from '@/assets/js/modules/sideSearch'

// Fake use for location result
function fakeLocationUse(data) {
  sideSearch.open()
  console.log(data)
}

loadLocation(455825)

createListener({
  eventName: 'click',
  elementId: 'location-button',
  callback: () => {
    requestLocation(fakeLocationUse)
  }
})
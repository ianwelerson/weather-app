// Load CSS
import '@/assets/scss/main.scss'

// Modules
import createListener from '@/assets/js/modules/createListener'
import requestLocation from '@/assets/js/modules/requestLocation'

// Fake use for location result
function fakeLocationUse(data) {
  console.log(data)
}

createListener({
  eventName: 'click',
  elementId: 'location-button',
  callback: () => {
    requestLocation(fakeLocationUse)
  }
})
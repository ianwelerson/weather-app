/**
 * Load the correct location based on specific order
 */
import { loadLocation } from '@/assets/js/modules/loadLocation'

const DEFAULT_LOCATION = 8775

function initialLocation (location = null) {
  let locationToLoad = DEFAULT_LOCATION

  // Provided woeid
  if (!!Number(location)) {
    locationToLoad = location
  }

  // Localstorage
  const localStoreWoeid = Number(window.localStorage.getItem('woeid'))
  if (!!localStoreWoeid) {
    locationToLoad = localStoreWoeid
  }

  // URL param
  const urlWoeid = new URLSearchParams(window.location.search).get('woeid')
  if (!!Number(urlWoeid)) {
    locationToLoad = Number(urlWoeid)
  }

  loadLocation(locationToLoad)
}

export default initialLocation
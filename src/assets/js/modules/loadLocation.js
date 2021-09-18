import { getPlaceByWoeid } from '@/assets/js/api/metaweather'
import renderContent from '@/assets/js/modules/renderContent'

async function loadLocation (woeid) {
  try {
    if (!woeid) {
      throw new Error('Invalid data')
    }
    
    const response = await getPlaceByWoeid(woeid)

    // Save woeid in storage
    window.localStorage.setItem('woeid', woeid)

    renderContent(response)

    return response
  } catch (error) {
    return error
  }
}

// TODO: Add to test
function reloadLocation () {
  const woeid = window.localStorage.getItem('woeid')

  if (woeid) {
    loadLocation(woeid)
  }
}

export {
  loadLocation,
  reloadLocation
}

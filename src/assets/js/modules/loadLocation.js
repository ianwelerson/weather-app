import { getPlaceByWoeid } from '@/assets/js/api/metaweather'
import renderContent from '@/assets/js/modules/renderContent'
import loadingState from '@/assets/js/modules/loadingState'

async function loadLocation (woeid) {
  loadingState.set(true)

  try {
    if (!woeid) {
      throw new Error('Invalid data')
    }
    
    const response = await getPlaceByWoeid(woeid)

    // Save woeid in storage
    window.localStorage.setItem('woeid', woeid)

    renderContent(response)

    loadingState.set(false)

    return response
  } catch (error) {
    return error
  }
}

export {
  loadLocation
}

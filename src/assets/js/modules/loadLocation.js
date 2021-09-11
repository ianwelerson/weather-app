import { getPlaceByWoeid } from '@/assets/js/api/metaweather'
import renderContent from '@/assets/js/modules/renderContent'

async function loadLocation (woeid) {
  try {
    if (!woeid) {
      throw new Error('Invalid data')
    }
    
    const response = await getPlaceByWoeid(woeid)

    renderContent(response)

    return response
  } catch (error) {
    return error
  }
}

export default loadLocation

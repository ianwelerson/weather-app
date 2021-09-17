import { getPlaceByCoord, getPlacesByQuery } from '@/assets/js/api/metaweather'

function searchLocation (data) {
  // Validating data
  const isObject = typeof data === 'object'
  if ((isObject && !data?.coords) || (!isObject && typeof data !== 'string')) {
    throw new Error('Invalid data')
  }

  if (isObject) {
    return getPlaceByCoord({
      lat: data.coords.latitude,
      long: data.coords.longitude
    })
  }

  return getPlacesByQuery(data)
}

export default searchLocation
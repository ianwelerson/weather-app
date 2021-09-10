const cors = 'https://cors-anywhere.herokuapp.com'
const api = `${cors}/https://www.metaweather.com/api`

/**
 * Get a list of places by a term
 * @param {string} query the search query value
 * @returns Promise
 */
function getPlacesByQuery (query) {
  return fetch(`${api}/location/search/?query=${query}`)
    .then(response => response.json())
    .then(response => {
      return response
    })
}

/**
 * Get a place by a woeid
 * @param {string} woeid the id
 * @returns Promise
 */
function getPlaceByWoeid (woeid) {
  return fetch(`${api}/location/${woeid}`)
    .then(response => response.json())
    .then(response => {
      return response
    })
}

/**
 * Get a place by lat and long
 * @param {string} lat
 * @param {string} long
 * @returns Promise
 */
function getPlaceByCoord ({ lat, long}) {
  return fetch(`${api}/location/search/?lattlong=${lat},${long}`)
    .then(response => response.json())
    .then(response => {
      return response
    })
}

export {
  getPlacesByQuery,
  getPlaceByWoeid,
  getPlaceByCoord
}

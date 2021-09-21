// TODO: Change weather source
const cors = 'https://cors-anywhere.herokuapp.com' // Cors Anywhere
const api = 'https://www.metaweather.com/api' // Meta Weather API
const fullApi = `${cors}/${api}` // Full API route

/**
 * Get a list of places by a term
 * @param {string} query the search query value
 * @returns Promise
 */
function getPlacesByQuery (query) {
  return fetch(`${fullApi}/location/search/?query=${query}`)
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
  return fetch(`${fullApi}/location/${woeid}`)
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
  return fetch(`${fullApi}/location/search/?lattlong=${lat},${long}`)
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

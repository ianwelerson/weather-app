const cors = 'https://cors-anywhere.herokuapp.com'
const api = `${cors}/https://www.metaweather.com/api`

/**
 *
 * @param {string} query the search query value
 * @returns Promise
 */
export function getPlacesByQuery (query) {
  return fetch(`${api}/location/search/?query=${query}`)
    .then(response => response.json())
    .then(response => {
      return response
    })
}

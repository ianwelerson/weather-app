/**
 * Request user location
 * 
 * @param {function} callback function that will be called after get location
 * @returns if the browser supports geolocation
 */
function requestLocation (callback) {
  // Check if navigator has geolocation api
  if (!navigator.geolocation) {
    throw new Error('Browser does\'t support geolocation')
  }

  navigator.geolocation.getCurrentPosition(callback);

  return true
}

export default requestLocation

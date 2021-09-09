/**
 * Request user location
 * 
 * @param {function} callback 
 * @returns if the browser supports geolocation
 */
function requestLocation (callback) {
  if (!navigator.geolocation) {
    return false
  }

  navigator.geolocation.getCurrentPosition(callback);

  return true
}

export default requestLocation
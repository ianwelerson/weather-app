
/**
 * This module creates all page events
 */

/**
 * Create a listener
 * @returns boolean
 */
function createListener ({ eventName, elementId, callback }) {
  if (!eventName || !elementId || !(typeof callback === 'function')) {
    return false
  }

  const element = document.getElementById(elementId)

  if (!element) {
    return false
  }

  element.addEventListener(eventName, (event) => {
    callback(event)
  })

  return true
}

export default createListener

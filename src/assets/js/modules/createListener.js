/**
 * Create a listener
 * @returns boolean
 */
function createListener ({ eventName, elementId, callback }) {
  if (!eventName || !elementId || !(typeof callback === 'function')) {
    throw new Error('Incorrect data')
  }

  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Element not found')
  }

  element.addEventListener(eventName, (event) => {
    callback(event)
  })

  return true
}

export default createListener

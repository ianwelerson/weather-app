// Not loading class
const NOT_LOADING_CLASS = 'skeleton-load--loaded'
const DATA_LOADING_CLASS = 'hide-element-on-loading'

// Current loading state
let isLoading = true

// Toggle loading elements
function toggleLoading () {
  const loadingElement = document.querySelectorAll('[data-loading=skeleton]')
  const dataElements = document.querySelectorAll('[data-loading=data]')
  // TODO: Create a generic method for this toggles
  if (isLoading) {
    dataElements.forEach(element => {
      element.classList.add(DATA_LOADING_CLASS)
    })

    loadingElement.forEach(element => {
      element.classList.remove(NOT_LOADING_CLASS)
    })

    return
  }

  loadingElement.forEach(element => {
    element.classList.add(NOT_LOADING_CLASS)
  })

  dataElements.forEach(element => {
    element.classList.remove(DATA_LOADING_CLASS)
  })
}

export default {
  get: () => {
    return isLoading
  },
  set: (state) => {
    if (typeof state !== 'boolean') {
      throw new Error('The values must be a boolean')
    }

    // Set state
    isLoading = state
    // Trigger the class toggle
    toggleLoading()
  }
}
// Not loading class
const NOT_LOADING_CLASS = 'skeleton-load--loaded'
const DATA_LOADING_CLASS = 'hide-element-on-loading'

// Current loading state
let isLoading = true

// Toggle loading elements
function toggleLoading () {
  const loadingElement = document.querySelectorAll('[data-loading=skeleton]')
  const dataElements = document.querySelectorAll('[data-loading=data]')

  if (isLoading) {
    changeClass({
      elements: dataElements,
      cssClass: DATA_LOADING_CLASS,
      remove: false
    })
  
    changeClass({
      elements: loadingElement,
      cssClass: NOT_LOADING_CLASS,
      remove: true
    })
    return
  }

  changeClass({
    elements: dataElements,
    cssClass: DATA_LOADING_CLASS,
    remove: true
  })

  changeClass({
    elements: loadingElement,
    cssClass: NOT_LOADING_CLASS,
    remove: false
  })
}

function changeClass({ elements, remove, cssClass  }) {
  if (remove) {
    elements.forEach(element => {
      element.classList.remove(cssClass)
    })

    return
  }

  elements.forEach(element => {
    element.classList.add(cssClass)
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
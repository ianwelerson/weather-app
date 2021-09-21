// Modules
import initialLocation from '@/assets/js/modules/initialLocation'

function changeUnit (unit) {
  const treatedUnit = unit.toLowerCase()

  if (treatedUnit !== 'c' && treatedUnit !== 'f') {
    throw new Error('Invalid format')
  }

  changeButtonClass(treatedUnit)
  window.localStorage.setItem('unit', treatedUnit)
  initialLocation()
}

function changeButtonClass (unit) {
  const fahrenheit = document.getElementById('change-unit-fahrenheit')
  const celsius = document.getElementById('change-unit-celsius')
  const className = 'button--selected'

  if (unit === 'c') {
    fahrenheit.classList.remove(className)
    celsius.classList.add(className)
  }

  if (unit === 'f') {
    celsius.classList.remove(className)
    fahrenheit.classList.add(className)
  }
}

export default changeUnit
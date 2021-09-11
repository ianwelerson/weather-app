/**
 * Receive a temperature and converts to another, is it is required
 * @param current the current format (f or c)
 * @param required the required value format (f, c or same). If same is received, then the current format is preserved
 * @param value the value
 * 
 * @returns object
 */
export default ({ current, required, value }) => {
  const allowedFormats = ['C', 'F']

  if (!current || !required || !value) {
    throw new Error('Some value is missing')
  }

  // Values
  const currentFormatted = current.toUpperCase()
  const requiredFormatted = required.toUpperCase()

  if (!allowedFormats.includes(currentFormatted)) {
    throw new Error('Invalid current format')
  }

  if (!['SAME', ...allowedFormats].includes(requiredFormatted)) {
    throw new Error('Invalid required format')
  }

  if (currentFormatted === requiredFormatted || requiredFormatted === 'SAME') {
    return {
      value: value,
      unit: `°${currentFormatted}`,
      text: `${value} °${currentFormatted}`,
    }
  }
  
  let returnValue

  if (requiredFormatted === 'F') {
    returnValue = Number(((Number(value) * 1.8) + 32).toFixed(1))
  }

  if (requiredFormatted === 'C') {
    returnValue = Number(((Number(value) - 32) / 1.8).toFixed(1))
  }

  return {
    value: returnValue,
    unit: `°${requiredFormatted}`,
    text: `${returnValue} °${requiredFormatted}`
  }
}
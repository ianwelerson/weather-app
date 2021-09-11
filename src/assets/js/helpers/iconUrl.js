/**
 * This helper creates the icon URL based on received ID
 */
export default (id) => {
  const allowedIds = ['sn', 'sl', 'h', 't', 'hr', 'lr', 's', 'hc', 'lc', 'c']

  if (!allowedIds.includes(id)) {
    throw new Error('Invalid id')
  }

  return `https://www.metaweather.com/static/img/weather/${id}.svg`
}

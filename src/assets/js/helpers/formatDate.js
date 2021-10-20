/**
 * This helper receives a date and return the text version
 * Date format supported: YYYY-MM-DD and ISO
 */
export default (date) => {
  let dateValue

  // YYY-MM-DD
  if (!!(/(20[0-9]{2})-(0[1-9]|1[012])-([012][0-9]|3[01])/gm.exec(date))) {
    dateValue = `${date}T12:00:00.000Z`
  }

  // ISO
  if (!!(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d))))$/gm.exec(date))) {
    dateValue = date
  }

  // If date is null the received value is not valid
  if (!dateValue) {
    throw new Error('Invalid date')
  }

  // Return formatted date
  return new Intl.DateTimeFormat(navigator.language, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(dateValue))
}

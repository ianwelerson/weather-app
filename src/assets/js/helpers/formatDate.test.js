// Helper
import formatDate from '@/assets/js/helpers/formatDate'

describe('formatDate.js', () => {
  test('should throw an error if the format is invalid', () => {
    expect(() => formatDate('aaaa')).toThrow()
  })

  test('should return formatted date when date is in ISO format', () => {
    expect(formatDate('2021-09-10T14:06:13.406351Z')).toBe('Fri, Sep 10')
  })

  test('should return formatted date when date is in YYYY-MM-DD format', () => {
    expect(formatDate('2021-09-10')).toBe('Fri, Sep 10')
  })
})

import tempFormat from '@/assets/js/helpers/tempFormat'

describe('tempFormat', () => {
  describe('validate data', () => {
    test('should throw and error if some value is missing', () => {
      expect(() => tempFormat({
        current: 'c',
      })).toThrowError(new Error('Some value is missing'))
    })
  
    test('should throw and error if the current format is invalid', () => {
      expect(() => tempFormat({
        current: 'a',
        required: 'same',
        value: 10
      })).toThrowError(new Error('Invalid current format'))
    })
  
    test('should throw and error if the required format is invalid', () => {
      expect(() => tempFormat({
        current: 'c',
        required: 'a',
        value: 10
      })).toThrowError(new Error('Invalid required format'))
    })
  })

  describe('values treatment', () => {
    test('should return the same format if the current and required are equals', () => {
      const value = tempFormat({
        current: 'c',
        required: 'c',
        value: 10
      })

      expect(value).toMatchObject({
        unit: '°C',
        value: 10,
        text: '10 °C'
      })
    })

    test('should return the same format if the required value is \'same\'', () => {
      const value = tempFormat({
        current: 'c',
        required: 'same',
        value: 10
      })

      expect(value).toMatchObject({
        unit: '°C',
        value: 10,
        text: '10 °C'
      })
    })

    test('should return converted from °C to °F', () => {
      const value = tempFormat({
        current: 'c',
        required: 'f',
        value: 18
      })

      expect(value).toMatchObject({
        unit: '°F',
        value: 64.4,
        text: '64.4 °F'
      })
    })

    test('should return converted from °F to °C', () => {
      const value = tempFormat({
        current: 'f',
        required: 'c',
        value: 101.3
      })

      expect(value).toMatchObject({
        unit: '°C',
        value: 38.5,
        text: '38.5 °C'
      })
    })
  })
})
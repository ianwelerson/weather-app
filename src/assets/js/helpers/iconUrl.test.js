// Helper
import iconUrl from '@/assets/js/helpers/iconUrl'

describe('iconUrl.js', () => {
  test('should validate if icon id is allowed', () => {
    expect(() => iconUrl('ab')).toThrow()
  })

  test('should return a correct icon url', () => {
    const url = iconUrl('hc')

    expect(url).toBe('https://www.metaweather.com/static/img/weather/hc.svg')
  })
})
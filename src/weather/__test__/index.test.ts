import {getWeatherInfoByCityCode} from '../index'

describe('getWeatherInfoByCityCode', () => {
  test('success', async () => {
    const weatherInfoList = await getWeatherInfoByCityCode('101280601')
    expect(weatherInfoList.length).toBe(7)
  })
})

import {getCityCodeByName} from './location/index'
import {getWeatherInfoByCityCode} from './weather/index'

export const query = async (name: string): Promise<wq.blackmatch.cn.WeatherInfo[]> => {
  const cityCode = await getCityCodeByName(name)
  const weatherInfoList = await getWeatherInfoByCityCode(cityCode)

  return weatherInfoList
}

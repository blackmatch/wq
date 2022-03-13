import axios from "axios"
import {parse} from "node-html-parser"

export const getWeatherInfoByCityCode = async (cityCode: string): Promise<wq.blackmatch.cn.WeatherInfo[]> => {
  const url = `http://www.weather.com.cn/weather/${cityCode}.shtml`;
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error(`Get weather page data failed! cityCode=${cityCode}`)
  }

  const htmlText = response.data
  const root = parse(htmlText)
  const districtItemList: string[] = []
  root.querySelectorAll('.ctop .crumbs a').forEach((node) => {
    districtItemList.push(node.innerText)
  })
  const districtName = districtItemList.join('>')
  const updatedAt = root.querySelector('#update_time')?.getAttribute('value') || ''
  const weatherInfoList: wq.blackmatch.cn.WeatherInfo[] = []
  root.querySelectorAll('#7d ul.t li.sky.skyid').forEach((node) => {
    const wInfo: wq.blackmatch.cn.WeatherInfo = {
      dateStr: node.querySelector('h1')?.innerText || '',
      weather: node.querySelector('.wea')?.innerText || '',
      temperature: node.querySelector('.tem i')?.innerText || '',
      wind: node.querySelector('.win i')?.innerText || '',
      city: districtName,
      updatedAt
    }
    weatherInfoList.push(wInfo)
  })

  return weatherInfoList
}

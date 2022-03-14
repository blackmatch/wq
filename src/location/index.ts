import axios from 'axios';

const baseUrl = 'http://toy1.weather.com.cn/search?cityname='

const getCityCode = (text: string): string => {
  const jsonStr = text.replace('success_jsonpCallback', '').replace('(', '').replace(')', '')
  const arr = JSON.parse(jsonStr)
  if (!(Array.isArray(arr) && arr.length > 0)) {
    throw new Error('Parse city code failed!')
  }

  return arr[0].ref.split('~')[0]
};

export const getCityCodeByName = async (name: string): Promise<string> => {
  const queryName = encodeURI(name.trim());

  const response = await axios.get(`${baseUrl}${queryName}`)
  if (response.status !== 200) {
    throw new Error('Request for city code failed!')
  }

  const htmlText = response.data
  return getCityCode(htmlText)
}

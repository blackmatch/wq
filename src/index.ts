import Crawler from "./lib/crawler";
import "./lib/model";

const cl = new Crawler();

function query(city: string): Promise<wq.blackmatch.cn.IWeatherInfo> {
  return new Promise(async (resolve, reject) => {
    try {
      const cityCode: string = await cl.getCityCode(city);
      const wInfo: wq.blackmatch.cn.IWeatherInfo = await cl.queryWeather(cityCode);
      resolve(wInfo);
    } catch (error) {
      reject(error)
    }
  });
}

export {
  query,
};

import "./model";

function print(wInfo: IWeatherInfo): void {
  if (wInfo.data.length > 0) {
    const spaces: string = "        ";
    let header: string = wInfo.otherData.city + spaces; 
    header += wInfo.otherData.updatedAt + spaces;
    header += "数据来源 中央气象台"
    console.log(header);

    for (let i: number = 0, iLen: number = wInfo.data.length; i < iLen; i += 1) {
      const item: IWeatherData = wInfo.data[i]
      const str = item.dateStr + "，" + item.weather + "，" + item.temperature
        + "，" + item.wind;
      console.log(str);
    }
  } else {
    console.log("很抱歉，无法查询到相关天气信息！");
  }
}

export {
  print,
};

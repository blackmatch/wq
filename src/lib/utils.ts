import colors from "colors";
import "./model";

function getColorFun(): any {
  const cidx: number = Math.random() * 6;
  const idx: number = Math.floor(cidx);

  switch (idx) {
    case 0:
      return colors.red;
    case 1:
      return colors.green;
    case 2:
      return colors.yellow;
    case 3:
      return colors.blue;
    case 4:
      return colors.magenta;
    case 5:
      return colors.cyan;
    case 6:
      return colors.gray;
    default:
      return colors.blue;
  }
}

function print(wInfo: wq.blackmatch.cn.IWeatherInfo): void {
  if (wInfo.data.length > 0) {
    const spaces: string = "  ";
    let header: string = spaces + wInfo.otherData.city + spaces;
    header += wInfo.otherData.updatedAt + spaces;
    header += "数据来源中央气象台";
    console.log(colors.green(header));
    console.log( spaces + "=========================================");

    for (let i: number = 0, iLen: number = wInfo.data.length; i < iLen; i += 1) {
      const item: wq.blackmatch.cn.IWeatherData = wInfo.data[i];
      const str = spaces + item.dateStr + " " + item.weather + " "
        + item.temperature + " " + item.wind;

      const colorFun: any = getColorFun();

      console.log(colorFun(str));
    }
    console.log( spaces + "=========================================");
  } else {
    console.log(colors.red("很抱歉，无法查询到相关天气信息！"));
  }
}

export {
  print,
};

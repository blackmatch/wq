import cheerio from "cheerio";
import request from "request";
import "./model";

class Crawler {
  public getCityCode(city: string): Promise<string> {
    const baseUrl: string = "http://toy1.weather.com.cn/search?cityname=";

    if (city.trim().length > 0) {
      const queryUrl: string = baseUrl + encodeURI(city.trim());
      return new Promise((resolve, reject) => {
        request.get(queryUrl, (err: Error, resp: any, body: string) => {
          if (err) {
            reject(err);
          } else {
            const cityCode: string = this.getCityCodeFromBody(body);
            resolve(cityCode);
          }
        });
      });
    } else {
      return Promise.resolve("");
    }
  }

  public queryWeather(cityCode: string): Promise<IWeatherInfo> {
    if (cityCode.trim().length > 0) {
      return new Promise((resove, reject) => {
        const webUrl = `http://www.weather.com.cn/weather/${cityCode}.shtml`;
        request.get(webUrl, (err: Error, resp: any, body: string) => {
          if (err) {
            reject(err);
          } else {
            const ws: IWeatherData[] = this.getWeatherInfoFromBody(body);
            const other: IOtherData = this.getOtherDataFromBody(body);
            const wInfo: IWeatherInfo = {
              data: ws,
              otherData: other,
            };
            resove(wInfo);
          }
        });
      });
    } else {
      const wInfo: IWeatherInfo = {
        data: [],
        otherData: {
          city: "",
          updatedAt: "",
        },
      };
      return Promise.resolve(wInfo);
    }
  }

  private getOtherDataFromBody(body: string): IOtherData {
    const $: any = cheerio.load(body);
    const elem: any = $(".ctop.clearfix .crumbs.fl");
    const links: any = $(elem).find("a");
    const otherInfo: IOtherData = {
      city: "",
      updatedAt: "",
    };
    const cts: string[] = [];
    if (links.length > 0) {
      links.each((idx: number, e: any) => {
        const str: string = $(e).text();
        if (str && str.trim().length > 0 && str.trim() !== ">") {
          cts.push(str.trim());
        }
      });
    }
    const spans: any = $(elem).find("span");
    if (spans.length > 0) {
      spans.each((idx: number, e: any) => {
        const str: string = $(e).text();
        if (str && str.trim().length > 0 && str.trim() !== ">") {
          cts.push(str.trim());
        }
      });
    }

    if (cts.length > 0) {
      otherInfo.city = cts.join(">");
    }

    const updateStr: string = $('#update_time').attr('value');
    otherInfo.updatedAt = updateStr + "更新";

    return otherInfo;
  }

  private getWeatherInfoFromBody(body: string): IWeatherData[] {
    const ws: IWeatherData[] = [];

    const $: any = cheerio.load(body);
    const ls: any = $(".t.clearfix .sky.skyid");
    ls.each((idx: number, elem: any) => {
      const info: IWeatherData = {
        dateStr: "",
        temperature: "",
        weather: "",
        wind: "",
      };
      info.dateStr = $(elem).find("h1").first().text();
      info.weather = $(elem).find(".wea").first().text();
      info.wind = $(elem).find(".win i").first().text();
      // temperature
      const tempSpan: any = $(elem).find(".tem span");
      if (tempSpan.length > 0) {
        info.temperature += $(elem).find(".tem span").first().text();
        info.temperature += "/";
      }
      info.temperature += $(elem).find(".tem i").first().text();

      ws.push(info);
    });

    return ws;
  }

  private getCityCodeFromBody(body: string): string {
    const str: string = body.replace("(", "").replace(")", "");
    const arr = JSON.parse(str);
    let cityCode: string = "";
    if (arr.length > 0) {
      cityCode = arr[0].ref.split("~")[0];
    }

    return cityCode;
  }
}

export default Crawler;

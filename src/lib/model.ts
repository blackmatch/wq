namespace wq.blackmatch.cn {
  export type IWeatherData = {
    dateStr: string;
    weather: string;
    temperature: string;
    wind: string;
  }
  
  export type IOtherData = {
    city: string;
    updatedAt: string;
  }
  
  export type  IWeatherInfo = {
    data: IWeatherData[];
    otherData: IOtherData;
  }
}

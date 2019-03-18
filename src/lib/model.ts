interface IWeatherData {
  dateStr: string;
  weather: string;
  temperature: string;
  wind: string;
}

interface IOtherData {
  city: string;
  updatedAt: string;
}

interface IWeatherInfo {
  data: IWeatherData[];
  otherData: IOtherData;
}

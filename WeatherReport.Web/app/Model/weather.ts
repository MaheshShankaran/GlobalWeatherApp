export interface ICitiesData {
    cityName: string;
}

export class IWeatherData {
    weatherReportLocation: string;
    weatherReportTime: string
    wind: string;
    visibility: string;
    skyConditions: string;
    temperature: string;
    dewPoint: string;
    relativeHumidity: string;
    pressure: string;
}

export interface IConfigSettings {
    webApiUrl: string;
}

export var settings: IConfigSettings = {
    webApiUrl: "http://localhost:50890/api"
}
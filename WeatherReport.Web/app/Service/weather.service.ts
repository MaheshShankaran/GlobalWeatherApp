import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

import { ICitiesData, IWeatherData, settings } from "../Model/weather";


@Injectable()
export class WeatherService {
    constructor(private http: Http) { }

    private JsonRequest<T1, T2>(params: T1, url: string): Promise<T2> {
        let body = (params == null) ? "" : JSON.stringify(params);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(settings.webApiUrl + "/WeatherHome/" +
                              url, body, options).toPromise().then(this.extractData).catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

    getCitiesByCountry(countryName: any): Promise<ICitiesData[]> {
        return this.JsonRequest({ countryName: countryName }, "GetCitiesByCountry");
    }

    getWeather(cityName: any, countryName: any): Promise<IWeatherData> {
        return this.JsonRequest({ cityName: cityName, countryName: countryName }, "GetWeather");
    }

}

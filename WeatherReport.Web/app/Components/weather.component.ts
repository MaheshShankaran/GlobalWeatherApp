import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ICitiesData, IWeatherData } from "../Model/weather";
import { Observable } from "rxjs/Rx";
import { Global } from "../Shared/global";
import { WeatherService } from "../Service/weather.service";


@Component({
    templateUrl: "app/Components/weather.component.html"
})

export class WeatherReportComponent implements OnInit  {
    selectedCountry: string = null;
    selectedCity: string = null;
    citiesList: ICitiesData[] = [];
    weatherData: IWeatherData;
    isResultNull: boolean = false;
    displayMessage: string = "";
    isnewCountry: boolean = false;
    previousCountrySelection: string = null;
    isWeatherReportDisplay: boolean = false;

    constructor(private _weatherService: WeatherService) {
    }


    ngOnInit() {
    }

    getCities() {
        this.citiesList = [];
        this.isResultNull = false;
        this.isnewCountry = true;
        if (!this.validateUserInput()) {
            this._weatherService.getCitiesByCountry(this.selectedCountry).then(data => {
                this.citiesList = data;
                this.isResultNull = (this.citiesList == null) ? true : false;
                this.displayMessage = (this.isResultNull) ? "City data unavailable for country: " + this.selectedCountry : "";
                this.previousCountrySelection = this.selectedCountry;
                console.log(this.citiesList);
                console.log(this.previousCountrySelection );
            });
        }
        
    }

    onCitySelectionChange(event: Event, value: string) {
        this._weatherService.getWeather(this.selectedCity, this.selectedCountry).then(data => {
            this.weatherData = <IWeatherData>data;
            this.isWeatherReportDisplay = (this.weatherData !== null) ? true : false;

        });
    }

    private validateUserInput(): boolean {
        if (this.selectedCountry == null || this.selectedCountry == "") {
            this.isResultNull = true;
            this.displayMessage = "Please entry a country name.";

            return this.isResultNull
        }
    }

}

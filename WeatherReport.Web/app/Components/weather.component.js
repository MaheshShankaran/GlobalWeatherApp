"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var weather_service_1 = require("../Service/weather.service");
var WeatherReportComponent = /** @class */ (function () {
    function WeatherReportComponent(_weatherService) {
        this._weatherService = _weatherService;
        this.selectedCountry = null;
        this.selectedCity = null;
        this.citiesList = [];
        this.isResultNull = false;
        this.displayMessage = "";
        this.isnewCountry = false;
        this.previousCountrySelection = null;
        this.isWeatherReportDisplay = false;
    }
    WeatherReportComponent.prototype.ngOnInit = function () {
    };
    WeatherReportComponent.prototype.getCities = function () {
        var _this = this;
        this.citiesList = [];
        this.isResultNull = false;
        this.isnewCountry = true;
        if (!this.validateUserInput()) {
            this._weatherService.getCitiesByCountry(this.selectedCountry).then(function (data) {
                _this.citiesList = data;
                _this.isResultNull = (_this.citiesList == null) ? true : false;
                _this.displayMessage = (_this.isResultNull) ? "City data unavailable for country: " + _this.selectedCountry : "";
                _this.previousCountrySelection = _this.selectedCountry;
                console.log(_this.citiesList);
                console.log(_this.previousCountrySelection);
            });
        }
    };
    WeatherReportComponent.prototype.onCitySelectionChange = function (event, value) {
        var _this = this;
        this._weatherService.getWeather(this.selectedCity, this.selectedCountry).then(function (data) {
            _this.weatherData = data;
            _this.isWeatherReportDisplay = (_this.weatherData !== null) ? true : false;
        });
    };
    WeatherReportComponent.prototype.validateUserInput = function () {
        if (this.selectedCountry == null || this.selectedCountry == "") {
            this.isResultNull = true;
            this.displayMessage = "Please entry a country name.";
            return this.isResultNull;
        }
    };
    WeatherReportComponent = __decorate([
        core_1.Component({
            templateUrl: "app/Components/weather.component.html"
        }),
        __metadata("design:paramtypes", [weather_service_1.WeatherService])
    ], WeatherReportComponent);
    return WeatherReportComponent;
}());
exports.WeatherReportComponent = WeatherReportComponent;
//# sourceMappingURL=weather.component.js.map
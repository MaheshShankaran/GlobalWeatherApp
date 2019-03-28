using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using WeatherReport.Entities;
using WeatherReport.DAL.GlobalWeatherService;

namespace WeatherReport.DAL
{
    public class WeatherReportDAL
    {
        private GlobalWeatherSoapClient _weatherServiceClient;

        public WeatherReportDAL()
        {
            _weatherServiceClient = new GlobalWeatherSoapClient();
        }

        
        public List<CityEntity> GetCitiesByCountry(GetCitiesByCountryArgs args)
        {
            try
            {
                List<CityEntity> citiesList = new List<CityEntity>();
                string cities = _weatherServiceClient.GetCitiesByCountry(args.countryName);

                return FetchCityListFromXml(cities, args.countryName); ;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public WeatherEntity GetWeather(GetWeatherArgs args)
        {
            try
            {
                WeatherEntity weather = new WeatherEntity();
                string soapResponse = _weatherServiceClient.GetWeather(args.cityName, args.countryName);
                if(soapResponse == "Data Not Found" || soapResponse == null || soapResponse == "")
                {
                    weather = PopulateDefaultWeather();
                    weather.WeatherReportLocation = args.cityName;
                    weather.WeatherReportTime = DateTime.Now.ToShortTimeString();
                }
                return weather;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private List<CityEntity> FetchCityListFromXml(string cities, string countryName)
        {
            List<CityEntity> citiesList = new List<CityEntity>();
            XDocument xmlResult = XDocument.Parse(cities);
            
            citiesList = (  from city in xmlResult.Descendants("NewDataSet").Elements("Table")
                            let c = city.Element("Country")
                            where (string)c.Value == countryName
                            select new CityEntity
                            {
                                CityName = (string)city.Element("City").Value
                            }).ToList();

            return citiesList;
        }

        private WeatherEntity PopulateDefaultWeather()
        {
            WeatherEntity defaultWeather = new WeatherEntity();
            defaultWeather.DewPoint = "2.4°C";
            defaultWeather.Pressure = "-";
            defaultWeather.RelativeHumidity = "32%";
            defaultWeather.SkyConditions = "Mostly clear";
            defaultWeather.Temperature = "18.6°C";
            defaultWeather.Visibility = "16 km";
            defaultWeather.Wind = "WNW 16km/h";

            return defaultWeather;
        }
    }

    public class GetCitiesByCountryArgs
    {
        public string countryName;
    }

    public class GetWeatherArgs
    {
        public string cityName;
        public string countryName;
    }
}
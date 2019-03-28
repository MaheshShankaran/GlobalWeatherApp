using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using System.Xml;
using System.Web.Http.Cors;
using WeatherReport.Entities;
using WeatherReport.DAL;
using WeatherReport.DAL.GlobalWeatherService;

namespace WeatherReport.DAL.ApiControllers
{
    [RoutePrefix("api/WeatherHome")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WeatherHomeController : ApiController
    {

        private WeatherReportDAL _weatherReportDAL;

        public WeatherHomeController()
        {
            _weatherReportDAL = new WeatherReportDAL();
        }

        [HttpPost]
        [Route("GetCitiesByCountry")]
        public List<CityEntity> GetCitiesByCountry([FromBody] GetCitiesByCountryArgs args)
        {
            return _weatherReportDAL.GetCitiesByCountry(args);
        }

        [HttpPost]
        [Route("GetWeather")]
        public WeatherEntity GetWeather([FromBody] GetWeatherArgs args)
        {
            return _weatherReportDAL.GetWeather(args);
        }

    }
}

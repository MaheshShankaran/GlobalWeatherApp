using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherReport.Entities
{
    public class CityEntity
    {
        public string CityName { get; set; }
    }

    public class WeatherEntity
    {
        public string WeatherReportLocation { get; set; }
        public string WeatherReportTime { get; set; }
        public string Wind { get; set; }
        public string Visibility { get; set; }
        public string SkyConditions { get; set; }
        public string Temperature { get; set; }
        public string DewPoint { get; set; }
        public string RelativeHumidity { get; set; }
        public string Pressure { get; set; }
    }
}

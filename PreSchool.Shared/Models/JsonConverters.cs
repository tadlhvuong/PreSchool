using Newtonsoft.Json.Converters;

namespace PreSchool.Shared.Models
{
    public class ShortDateConverter : IsoDateTimeConverter
    {
        public ShortDateConverter()
        {
            DateTimeFormat = "yyyy-MM-dd";
        }
    }

    public class ShortTimeConverter : IsoDateTimeConverter
    {
        public ShortTimeConverter()
        {
            DateTimeFormat = "yyyy-MM-dd HH:mm";
        }
    }
}

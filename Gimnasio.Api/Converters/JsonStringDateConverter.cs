using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Gimnasio.Api.Converters
{
    public class JsonStringDateConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            // DateTime.Parse admite formatos ISO con fecha y hora
            return DateTime.Parse(value!, null, System.Globalization.DateTimeStyles.RoundtripKind);
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            // Devolver la fecha tal cual la almacena .NET (incluye la hora)
            writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ss"));
        }
    }

}
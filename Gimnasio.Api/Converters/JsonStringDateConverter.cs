using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Gimnasio.Api.Converters
{
    /// <summary>
    /// Conversor personalizado para serializar y deserializar valores DateTime cuando se intercambian datos vía JSON.
    ///
    /// Este converter:
    /// - Permite leer fechas enviadas como string en formato ISO 8601.
    /// - Fuerza un formato consistente al escribir (yyyy-MM-ddTHH:mm:ss).
    ///
    /// Esto soluciona diferencias entre clientes (frontend) y backend, evitando problemas comunes como:
    /// - Pérdida de zona horaria
    /// - Formatos distintos según configuración regional
    /// - Errores al recibir fechas en texto
    ///
    /// Se registra en Program.cs dentro de JsonOptions para aplicarse globalmente.
    /// </summary>
    public class JsonStringDateConverter : JsonConverter<DateTime>
    {
        /// <summary>
        /// Convierte un string JSON en un DateTime de .NET.
        /// 
        /// DateTime.Parse admite valores ISO incluyendo "Z", offset, etc.
        /// Se usa DateTimeStyles.RoundtripKind para conservar el "Kind" (UTC/Local).
        /// </summary>
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();

            // DateTime.Parse acepta fechas ISO estándar.
            // El operador ! es seguro porque el framework garantiza lectura válida.
            return DateTime.Parse(
                value!,
                null,
                System.Globalization.DateTimeStyles.RoundtripKind
            );
        }

        /// <summary>
        /// Serializa un DateTime en un formato controlado por el backend.
        /// 
        /// Se usa un formato ISO claro y estable:
        ///   yyyy-MM-ddTHH:mm:ss
        /// </summary>
        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(
                value.ToString("yyyy-MM-ddTHH:mm:ss")
            );
        }
    }
}

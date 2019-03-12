using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace PreSchool.Shared.Helpers
{
    public class CsvFileResult<T> : FileResult
    {
        public IList<T> ItemList { get; private set; }
        public char Separator { get; set; }
        public bool UseQuotes { get; set; }

        public CsvFileResult(IList<T> list, string fileName)
            : base("text/csv")
        {
            ItemList = list;
            Separator = ',';
            FileDownloadName = fileName;
        }

        public override Task ExecuteResultAsync(ActionContext context)
        {
            var response = context.HttpContext.Response;
            var contentDisposition = new ContentDisposition { FileName = FileDownloadName, Inline = false };
            response.Headers.Add("Content-Disposition", contentDisposition.ToString());

            using (var memoryStream = new MemoryStream())
            {
                WriteList(memoryStream);
                response.Body.Write(memoryStream.GetBuffer(), 0, (int)memoryStream.Length);
            }

            return base.ExecuteResultAsync(context);
        }

        private void WriteList(Stream stream)
        {
            var streamWriter = new StreamWriter(stream, Encoding.UTF8);

            WriteHeaderLine(streamWriter);
            WriteDataLines(streamWriter);

            streamWriter.Flush();
        }

        private void WriteHeaderLine(StreamWriter streamWriter)
        {
            var fieldList = typeof(T).GetProperties();
            for (int i = 0; i < fieldList.Length; i++)
                WriteValue(streamWriter, fieldList[i].Name, i == (fieldList.Length - 1));
        }

        private void WriteDataLines(StreamWriter streamWriter)
        {
            foreach (T line in ItemList)
            {
                var fieldList = typeof(T).GetProperties();
                for (int i = 0; i < fieldList.Length; i++)
                    WriteValue(streamWriter, GetPropertyValue(line, fieldList[i].Name), i == (fieldList.Length - 1));
            }
        }

        private void WriteValue(StreamWriter writer, String value, bool endOfLine)
        {
            if (UseQuotes)
                writer.Write("\"");

            writer.Write(value.Replace("\"", "\"\""));

            if (UseQuotes)
                writer.Write("\"");

            if (endOfLine)
                writer.WriteLine();
            else
                writer.Write(Separator);
        }

        private static string GetPropertyValue(object src, string propName)
        {
            return src.GetType().GetProperty(propName).GetValue(src, null).ToString() ?? "";
        }
    }
}

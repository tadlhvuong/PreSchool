using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace PreSchool.Shared.Helpers
{
    public static class Common
    {
        static Random rdm = new Random();
        static DateTime utcStart = new DateTime(1970, 1, 1);

        public static readonly Encoding Encoding1252;
        public static readonly char[] LineDelimiters = new char[] { '\r', '\n' };

        static Common()
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding1252 = Encoding.GetEncoding(1252);
        }

        public static float RandomF()
        {
            return (float)(2 * rdm.NextDouble() - 1);
        }

        public static int Random()
        {
            return rdm.Next(0, int.MaxValue);
        }

        public static int Random(int maxValue)
        {
            return rdm.Next(0, maxValue);
        }

        public static int Random(int minValue, int maxValue)
        {
            return rdm.Next(minValue, maxValue);
        }

        public static int RandomWeight(int minValue, int maxValue)
        {
            var xRand = rdm.NextDouble();
            return minValue + (int)(xRand * xRand * xRand * (maxValue - minValue));
        }

        public static string Random_Mix(int _size)
        {
            byte[] res = new byte[_size];
            byte achar = 0;
            for (int i = 0; i < _size; i++)
            {
                do
                {
                    achar = (byte)(rdm.Next(64) + 48);
                } while (((achar < 50) || (achar > 57)) && ((achar < 65) || (achar > 90) || (achar == 73) || (achar == 79)));
                res[i] = achar;
            }

            return Encoding.ASCII.GetString(res);
        }

        public static string Random_Num(int _size)
        {
            byte[] res = new byte[_size];
            byte achar = 0;
            for (int i = 0; i < _size; i++)
            {
                do
                {
                    achar = (byte)(rdm.Next(64) + 48);
                } while ((achar < 48) || (achar > 57));
                res[i] = achar;
            }

            return Encoding.ASCII.GetString(res);
        }

        public static int IP_GetIntValue(IPAddress ipAddress)
        {
            byte[] bytes = ipAddress.GetAddressBytes();
            if (bytes.Length != 4)
                return 0;

            return BitConverter.ToInt32(bytes, 0);
        }

        public static int IP_String2Int(string ipString)
        {
            var ipAddress = IPAddress.Loopback;
            IPAddress.TryParse(ipString, out ipAddress);

            byte[] bytes = ipAddress.GetAddressBytes();
            if (bytes.Length != 4)
                return 0;

            return BitConverter.ToInt32(bytes, 0);
        }

        public static string IP_Int2String(int ipInteger)
        {
            try
            {
                byte[] ipbytes = BitConverter.GetBytes(ipInteger);
                var ipAddress = new IPAddress(ipbytes);
                return ipAddress.ToString();
            }
            catch
            {
                return "0.0.0.0";
            }
        }

        public static DateTime GetNext(DayOfWeek dayOfWeek, TimeSpan dayTime)
        {
            var start = (int)DateTime.Today.DayOfWeek;
            var target = (int)dayOfWeek;
            var nextTime = DateTime.Today.AddDays(target - start).Add(dayTime);
            if (nextTime <= DateTime.Now)
                nextTime = nextTime.AddDays(7);
            return nextTime;
        }

        public static long GetUnixUtcTime()
        {
            return (long)((DateTime.UtcNow - utcStart).TotalSeconds);
        }

        public static long GetUnixLocalTime()
        {
            return (long)((DateTime.Now - utcStart).TotalSeconds);
        }

        public static string HashMD5(string input)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] output = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sBuilder = new StringBuilder();
                for (int i = 0; i < output.Length; i++)
                    sBuilder.Append(output[i].ToString("x2"));
                return sBuilder.ToString();
            }
        }

        public static string Bytes2HexString(byte[] Bytes)
        {
            var Result = new StringBuilder();
            var HexAlphabet = "0123456789ABCDEF";

            foreach (byte B in Bytes)
            {
                Result.Append(HexAlphabet[(int)(B >> 4)]);
                Result.Append(HexAlphabet[(int)(B & 0xF)]);
            }
            return Result.ToString();
        }

        public static byte[] HexString2Bytes(string input)
        {
            if ((input.Length % 2) == 1) input += '0';

            byte[] packBytes = new byte[input.Length / 2];
            for (int i = 0; i < input.Length; i += 2)
                packBytes[i / 2] = Convert.ToByte(input.Substring(i, 2), 16);

            return packBytes;
        }

        public static string HashHMAC_SHA1(string input, byte[] keyBytes, bool raw = false)
        {
            byte[] datBytes = Encoding.UTF8.GetBytes(input);
            using (HMACSHA1 hMac = new HMACSHA1(keyBytes))
            {
                byte[] output = hMac.ComputeHash(datBytes);
                if (raw)
                    return Encoding1252.GetString(output);
                else
                {
                    var sBuilder = new StringBuilder();
                    for (int i = 0; i < output.Length; i++)
                        sBuilder.Append(output[i].ToString("x2"));

                    return sBuilder.ToString();
                }
            }
        }

        public static string HashHMAC_SHA256(string input, byte[] keyBytes, bool raw = false)
        {
            byte[] datBytes = Encoding.UTF8.GetBytes(input);
            using (HMACSHA256 hMac = new HMACSHA256(keyBytes))
            {
                byte[] output = hMac.ComputeHash(datBytes);
                if (raw)
                    return Encoding1252.GetString(output);
                else
                {
                    var sBuilder = new StringBuilder();
                    for (int i = 0; i < output.Length; i++)
                        sBuilder.Append(output[i].ToString("x2"));

                    return sBuilder.ToString();
                }
            }
        }

        public static string NormalizeVietnamese(string orgText)
        {
            if (orgText == null)
                return null;

            var newText = orgText.Normalize(NormalizationForm.FormD);
            var regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            newText = regex.Replace(newText, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D').Replace('\u0020', '-');
            newText = Regex.Replace(newText, "[^0-9a-zA-Z-._@+]+", "");
            return newText;
        }

        public static string SubString(string source, int maxChars = 30)
        {
            if (string.IsNullOrEmpty(source))
                return "";

            if (source.Length <= maxChars)
                return source;

            return source.Substring(0, maxChars) + "...";
        }

        public static string GetEnumText<EnumType>(EnumType enumValue)
        {
            var enumType = typeof(EnumType);
            if (!enumType.IsEnum)
                return enumValue.ToString();

            var memInfo = enumType.GetMember(enumValue.ToString());
            if (memInfo == null || memInfo.Length < 1)
                return enumValue.ToString();

            var attributes = memInfo[0].GetCustomAttributes(typeof(DisplayAttribute), false);
            if (attributes == null || attributes.Length < 1)
                return enumValue.ToString();

            return ((DisplayAttribute)attributes[0]).Name;
        }
    }
}

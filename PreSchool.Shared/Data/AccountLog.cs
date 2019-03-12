using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PreSchool.Shared.Data
{
    public class AccountLog
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [Display(Name = "Hoạt động")]
        public UserAction Action { get; set; }

        [StringLength(60)]
        [Display(Name = "Địa chỉ IP")]
        public string RemoteIP { get; set; }

        [Display(Name = "Dữ liệu")]
        public string LogData { get; set; }

        [Display(Name = "Thời điểm")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy HH:mm:ss}")]
        public DateTime LogTime { get; set; }

        [JsonIgnore, ForeignKey("UserId")]
        public virtual AppUser AppUser { get; set; }
    }
}

using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PreSchool.Shared.Data
{
    public class UserMeta
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [Display(Name = "Tên gọi")]
        [Required, StringLength(128)]
        public string MetaName { get; set; }

        [Display(Name = "Giá trị")]
        public string MetaValue { get; set; }

        [JsonIgnore, ForeignKey("UserId")]
        public virtual AppUser AppUser { get; set; }
    }
}

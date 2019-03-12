using PreSchool.Shared.Data;
using PreSchoolShared.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PreSchool.Shared.Data
{
    public class BlogPostTaxo
    {
        public int Id { get; set; }

        public int TaxoId { get; set; }

        public int PostId { get; set; }

        [ForeignKey("TaxoId")]
        public virtual Taxonomy Taxonomy { get; set; }

        [ForeignKey("PostId")]
        public virtual BlogPost BlogPost { get; set; }
    }

    public class BlogPost
    {
        public int Id { get; set; }

        [Display(Name = "Hình ảnh")]
        public int? AlbumId { get; set; }

        [StringLength(128)]
        [Display(Name = "Người tạo")]
        public string CreateUser { get; set; }

        [StringLength(128)]
        [Display(Name = "Người sửa")]
        public string UpdateUser { get; set; }

        [Display(Name = "Ngày tạo")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime? CreateTime { get; set; }

        [Display(Name = "Sửa cuối")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime? LastUpdate { get; set; }

        [Display(Name = "Giờ đăng")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime? PublishTime { get; set; }

        [Required]
        [StringLength(128)]
        [Display(Name = "Tiêu đề")]
        public string Title { get; set; }

        [StringLength(512)]
        [Display(Name = "Hình đại diện")]
        public string Image { get; set; }

        [StringLength(1024)]
        [Display(Name = "Link ngoài")]
        public string ExtLink { get; set; }

        [StringLength(1024)]
        [Display(Name = "Giới thiệu")]
        [DataType(DataType.MultilineText)]
        public string Preview { get; set; }

        [Display(Name = "Nội dung")]
        public string Content { get; set; }

        [Display(Name = "Định dạng")]
        public PostFormat Format { get; set; }

        [Display(Name = "Trạng thái")]
        public PostStatus Status { get; set; }

        [NotMapped]
        public PostStatus LastStatus { get; set; }

        [NotMapped]
        [Display(Name = "Phân loại")]
        public int[] PostCats { get; set; }

        [NotMapped]
        [Display(Name = "Thẻ gắn")]
        public string PostTags { get; set; }

        [ForeignKey("AlbumId")]
        public virtual MediaAlbum MediaAlbum { get; set; }

    }
}

using PreSchool.Shared.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PreSchoolShared.Data
{
    public class UserThread
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [MaxLength(64)]
        [Display(Name = "Nhân vật")]
        public string RoleInfo { get; set; }

        [MaxLength(64)]
        [Display(Name = "Liên hệ")]
        public string ContactInfo { get; set; }

        [MaxLength(256)]
        [Display(Name = "Tiêu đề")]
        public string Title { get; set; }

        public DateTime CreateTime { get; set; }

        public int LastPostId { get; set; }

        [MaxLength(256)]
        public string LastPostUser { get; set; }

        public DateTime? LastPostTime { get; set; }

        [Display(Name = "Trạng thái")]
        public ThreadStatus Status { get; set; }

        [ForeignKey("UserId")]
        public virtual AppUser AppUser { get; set; }

        public virtual ICollection<UserPost> ThreadPosts { get; set; }
    }

    public class UserPost
    {
        public int Id { get; set; }

        public int ThreadId { get; set; }

        public int PostType { get; set; }

        [MaxLength(256)]
        public string UserName { get; set; }

        public DateTime CreateTime { get; set; }

        public string Content { get; set; }

        [ForeignKey("ThreadId")]
        public virtual UserThread Thread { get; set; }
    }
}

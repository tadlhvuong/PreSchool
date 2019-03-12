using PreSchool.Shared.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PreSchoolShared.Data
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class BoxSchedule
    {
        public int Id { get; set; }

        [Display(Name = "Thời gian bắt đầu")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime BeginTime { get; set; }

        [Display(Name = "Thời gian kết thúc")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public DateTime EndTime { get; set; }

    }

    

    public class Schedule
    {
        public int Id { get; set; }

        [Display(Name = "Hoạt động")]
        public int? ActivityId { get; set; }

        [Display(Name = "Khung giờ")]
        public int? ScheduleId { get; set; }

        public DaySchedule Day { get; set; }

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
        
        [ForeignKey("ActivityId")]
        public virtual ICollection<Activity> Activity { get; set; }

        [ForeignKey("ScheduleId")]
        public virtual ICollection<BoxSchedule> BoxSchedule { get; set; }

    }
}

﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PreSchool.Shared.Data
{
    public class AppRole : IdentityRole<int>
    {
        public AppRole()
        {
        }

        public AppRole(string roleName)
            :base(roleName)
        {
        }
    }

    public class AppUser : IdentityUser<int>
    {
        [Display(Name = "Phân loại")]
        public UserType UserType { get; set; }

        [StringLength(32)]
        [Display(Name = "Mã Tài khoản")]
        public string AccountId { get; set; }

        [Display(Name = "Trạng thái")]
        public EntityStatus Status { get; set; }

        [Display(Name = "Khởi tạo")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy HH:mm}")]
        public DateTime? CreateTime { get; set; }

        [Display(Name = "IP khởi tạo")]
        [StringLength(60)]
        public string CreateIP { get; set; }

        [Display(Name = "Đăng nhập")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy HH:mm:ss}")]
        public DateTime? LastLogin { get; set; }

        [StringLength(60)]
        [Display(Name = "IP đăng nhập")]
        public string LastLoginIP { get; set; }

        [Display(Name = "Cập nhật")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy HH:mm:ss}")]
        public DateTime? LastUpdate { get; set; }

        [StringLength(128)]
        [Display(Name = "Quản trị")]
        public string UpdateUser { get; set; }

        public virtual ICollection<UserMeta> UserMetas { get; set; }
        public virtual ICollection<AccountLog> AccountLogs { get; set; }

        [NotMapped]
        public virtual ICollection<UserLoginInfo> ExtLogins { get; set; }

        [NotMapped]
        public string AvatarImg
        {
            get
            {
                if (ExtLogins == null)
                    return "/img/avatar.jpg";

                var fbLogin = ExtLogins.FirstOrDefault(x => x.LoginProvider == "Facebook");
                if (fbLogin == null)
                    return "/img/avatar.jpg";

                return string.Format("https://graph.facebook.com/{0}/picture?type=large", fbLogin.ProviderKey);
            }
        }

        [NotMapped]
        public string FacebookUrl
        {
            get
            {
                if (ExtLogins == null)
                    return null;

                var fbLogin = ExtLogins.FirstOrDefault(x => x.LoginProvider == "Facebook");
                if (fbLogin == null)
                    return null;

                return string.Format("https://www.facebook.com/app_scoped_user_id/{0}", fbLogin.ProviderKey);
            }
        }
    }
}

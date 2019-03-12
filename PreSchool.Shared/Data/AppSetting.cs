using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PreSchool.Shared.Data
{
    public class AppSetting
    {
        [Key]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        public string Value { get; set; }
    }

    public class EmailSettings
    {
        [DisplayName("Email xác thực")]
        public string EmailVerification { get; set; }

        [DisplayName("Email quên pass")]
        public string EmailForgotPass { get; set; }

        public EmailSettings()
        {
            EmailVerification = "Chào $USER$, mã xác thực email của bạn là: $CODE$";
            EmailForgotPass = "Chào $USER$, mã reset mật khẩu của bạn là: $CODE$";
        }
    }

    public class PhoneSettings
    {
        [StringLength(160)]
        [DisplayName("SMS xác thực")]
        [DataType(DataType.MultilineText)]
        public string PhoneVerification { get; set; }

        [StringLength(160)]
        [DisplayName("SMS quên pass")]
        [DataType(DataType.MultilineText)]
        public string PhoneForgotPass { get; set; }

        [StringLength(160)]
        [DisplayName("SMS báo OTP")]
        [DataType(DataType.MultilineText)]
        public string PhoneOTPMessage { get; set; }

        public PhoneSettings()
        {
            PhoneVerification = "Chao $USER$, ma xac thuc dien thoai cua ban la: $CODE$";
            PhoneForgotPass = "Chao $USER$, ma reset mat khau cua ban la: $CODE$";
            PhoneOTPMessage = "Chao $USER$, ma OTP cua ban la: $CODE$";
        }
    }
}

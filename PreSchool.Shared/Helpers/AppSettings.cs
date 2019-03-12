using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using PreSchool.Shared.Data;

namespace PreSchool.Shared.Helpers
{
    public static class AppSettings
    {
        public static StringMap Strings;
        public static EmailSettings EmailSettings;
        public static PhoneSettings PhoneSettings;

        static AppSettings()
        {
            Strings = new StringMap();
        }

        public static IApplicationBuilder InitAppSettings(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<AppDBContext>();
                InitData(serviceScope);
                LoadData(dbContext);
            }

            return app;
        }

        private static T LoadSettings<T>(string name) where T : new()
        {
            var settings = Strings[name];
            var result = string.IsNullOrEmpty(settings) ? new T() : JsonConvert.DeserializeObject<T>(settings);
            return result;
        }

        public static void LoadData(AppDBContext dbContext)
        {
            Strings.Clear();
            foreach (var item in dbContext.AppSettings)
                Strings[item.Name] = item.Value;

            EmailSettings = LoadSettings<EmailSettings>("EmailSettings");
            PhoneSettings = LoadSettings<PhoneSettings>("PhoneSettings");
        }

        public static void SaveData(AppDBContext dbContext, string key, object value)
        {
            var itemValue = (value is string) ? (string)value : JsonConvert.SerializeObject(value);

            var item = dbContext.AppSettings.Find(key);
            if (item == null)
            {
                item = new AppSetting() { Name = key, Value = itemValue };
                dbContext.AppSettings.Add(item);
            }

            item.Value = itemValue;
            dbContext.SaveChanges();
        }

        public static void InitData(IServiceScope serviceScope)
        {
            var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<AppRole>>();
            SeedRoles(roleManager);

            var userManager = serviceScope.ServiceProvider.GetService<UserManager<AppUser>>();
            SeedUsers(userManager);
        }

        public static void SeedRoles(RoleManager<AppRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Operator").Result)
            {
                var role = new AppRole("Operator");
                var roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Manager").Result)
            {
                var role = new AppRole("Manager");
                var roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                var role = new AppRole("Admin");
                var roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }

        public static void SeedUsers(UserManager<AppUser> userManager)
        {
            if (userManager.FindByNameAsync("Admin").Result == null)
            {
                var user = new AppUser()
                {
                    UserName = "Admin",
                    Email = "admin@domain.com",
                    CreateTime = DateTime.Now,
                    LastUpdate = DateTime.Now,
                    Status = EntityStatus.Enabled,
                };

                var result = userManager.CreateAsync(user, "AdminP@ssW0rd123").Result;
                if (result.Succeeded)
                {
                    var roles = new string[] { "Admin", "Manager", "Operator" };
                    userManager.AddToRolesAsync(user, roles).Wait();
                }
            }
            if (userManager.FindByNameAsync("Manager").Result == null)
            {
                var user = new AppUser()
                {
                    UserName = "Manager",
                    Email = "manager@domain.com",
                    CreateTime = DateTime.Now,
                    LastUpdate = DateTime.Now,
                    Status = EntityStatus.Enabled,
                };

                var result = userManager.CreateAsync(user, "Z7bJ6VnPpfzj").Result;
                if (result.Succeeded)
                {
                    var roles = new string[] { "Manager", "Operator" };
                    userManager.AddToRolesAsync(user, roles).Wait();
                }
            }
        }
    }
}

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PreSchoolShared.Data;

namespace PreSchool.Shared.Data
{
    public class AppDBContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public virtual DbSet<UserMeta> UserMetas { get; set; }
        public virtual DbSet<AppSetting> AppSettings { get; set; }
        public virtual DbSet<AccountLog> AccountLogs { get; set; }

        public virtual DbSet<UserThread> UserThreads { get; set; }
        public virtual DbSet<UserPost> UserPosts { get; set; }

        public virtual DbSet<MediaFile> MediaFiles { get; set; }
        public virtual DbSet<MediaAlbum> MediaAlbums { get; set; }
        public virtual DbSet<Taxonomy> Taxonomies { get; set; }
        public virtual DbSet<BlogPostTaxo> BlogPostTaxos { get; set; }
        public virtual DbSet<BlogPost> BlogPosts { get; set; }

        public AppDBContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>(b =>
            {
                b.HasIndex(e => e.UserType);
                b.HasIndex(e => e.CreateTime);
                b.HasIndex(e => e.CreateIP);
                b.HasIndex(e => e.LastLogin);
                b.HasIndex(e => e.LastLoginIP);
                b.HasIndex(e => e.AccountId).IsUnique();
            });

            builder.Entity<UserMeta>(b =>
            {
                b.HasIndex(e => e.MetaName);
            });

            builder.Entity<AccountLog>(b =>
            {
                b.HasIndex(e => e.Action);
            });

            builder.Entity<BlogPost>(b =>
            {
                b.HasIndex(e => e.Title);
            });

            builder.Entity<Taxonomy>(b =>
            {
                b.HasIndex(e => e.Type);
                b.HasIndex(e => e.Name);
            });
        }
    }
}

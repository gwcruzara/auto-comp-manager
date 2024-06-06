using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PI.Domain.Models;

namespace PI.Core.Mapping
{
    public class StudentClassMap : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("Student", "dbo");

            builder.HasKey(x => new { x.Id });

            builder.Property(x => x.Name)
                   .HasMaxLength(50)
                   .IsRequired(true);

            builder.Property(x => x.Job)
                   .HasMaxLength(50)
                   .IsRequired(false);

            builder.Property(x => x.IdSquad)
                    .IsRequired(false);

            builder.HasOne(x => x.Squad)
                   .WithMany(x => x.Student)
                   .HasForeignKey(x => x.IdSquad);
        }
    }
}

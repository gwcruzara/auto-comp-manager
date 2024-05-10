using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PI.Domain.Models;

namespace PI.Core.Mapping
{
    public class PenaltiesClassMap : IEntityTypeConfiguration<Penalties>
    {
        public void Configure(EntityTypeBuilder<Penalties> builder)
        {
            builder.ToTable("Penalties", "dbo");

            builder.HasKey(t => new { t.Id });

            builder.Property(x => x.Description)
                   .IsRequired();

            builder.Property(x => x.Time)
                   .IsRequired();

            builder.Property(x => x.IdSpeed)
                   .IsRequired();

            builder.HasOne(x => x.Speed)
                    .WithMany(x => x.Penalties)
                    .HasForeignKey(x => x.IdSpeed);
        }
    }
}

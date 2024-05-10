using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PI.Domain.Models;

namespace PI.Core.Mapping
{
    public class RampClassMap : IEntityTypeConfiguration<Ramp>
    {
        public void Configure(EntityTypeBuilder<Ramp> builder)
        {
            builder.ToTable("Ramp", "dbo");

            builder.HasKey(t => new { t.Id });

            builder.Property(x => x.Distance)                   
                   .IsRequired();

            builder.Property(x => x.Ranking)
                   .IsRequired();

            builder.Property(x => x.Score)
                   .IsRequired();

            builder.Property(x => x.IdSquad)
                   .IsRequired();

            builder.HasOne(x => x.Squad)
                   .WithMany(x => x.Ramp)
                   .HasForeignKey(x => x.IdSquad);
        }
    }
}

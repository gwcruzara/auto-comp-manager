using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PI.Domain.Models;

namespace PI.Core.Mapping
{
    public class TractionClassMap : IEntityTypeConfiguration<Traction>
    {
        public void Configure(EntityTypeBuilder<Traction> builder)
        {
            builder.ToTable("Traction", "dbo");

            builder.HasKey(t => new { t.Id });

            builder.Property(x => x.Weight)
                   .IsRequired();

            builder.Property(x => x.Ranking)
                   .IsRequired();

            builder.Property(x => x.Score)
                   .IsRequired();

            builder.Property(x => x.IdSquad)
                   .IsRequired();

            builder.HasOne(x => x.Squad)
                   .WithMany(x => x.Traction)
                   .HasForeignKey(x => x.IdSquad);
        }
    }
}

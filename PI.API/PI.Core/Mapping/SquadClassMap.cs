using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PI.Domain.Models;

namespace PI.Core.Mapping
{
    public class SquadClassMap : IEntityTypeConfiguration<Squad>
    {
        public void Configure(EntityTypeBuilder<Squad> builder)
        {
            builder.ToTable("Squad", "dbo");

            builder.HasKey(t => new { t.Id });

            builder.Property(x => x.Name)
                   .HasMaxLength(50)
                   .IsRequired();
            
            builder.Property(x => x.CarNumber)
                   .IsRequired();
        }
    }
}

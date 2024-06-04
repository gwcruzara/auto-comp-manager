using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PI.Domain.Models;

namespace PI.Core.Mapping
{
    public class SpeedClassMap : IEntityTypeConfiguration<Speed>
    {
        public void Configure(EntityTypeBuilder<Speed> builder)
        {
            builder.ToTable("Speed", "dbo");

            builder.HasKey(t => new { t.Id });

            builder.Property(x => x.Time)
                   .IsRequired();
            
            builder.Property(x => x.TimeWithoutPenalties)
                   .IsRequired();

            builder.Property(x => x.Ranking)
                   .IsRequired();

            builder.Property(x => x.Score)
                   .IsRequired();
            
            builder.Property(x => x.BurnedStart)
                   .IsRequired();
            
            builder.Property(x => x.OutsideLine)
                   .IsRequired();
            
            builder.Property(x => x.CutWay)
                   .IsRequired();

            builder.Property(x => x.IdSquad)
                   .IsRequired();

            builder.HasOne(x => x.Squad)
                   .WithMany(x => x.Speed)
                   .HasForeignKey(x => x.IdSquad);
        }
    }
}

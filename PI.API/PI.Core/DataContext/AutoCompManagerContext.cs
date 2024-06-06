using Microsoft.EntityFrameworkCore;
using PI.Core.Mapping;
using PI.Domain.Models;

namespace PI.Core.DataContext
{
    public class AutoCompManagerContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Squad> Squads { get; set; }
        public DbSet<Ramp> Ramps { get; set; }
        public DbSet<Speed> Speeds { get; set; }
        public DbSet<Traction> Tractions { get; set; }

        public AutoCompManagerContext(DbContextOptions<AutoCompManagerContext> options) : base(options){ }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new StudentClassMap());
            modelBuilder.ApplyConfiguration(new SquadClassMap());
            modelBuilder.ApplyConfiguration(new RampClassMap());
            modelBuilder.ApplyConfiguration(new SpeedClassMap());
            modelBuilder.ApplyConfiguration(new TractionClassMap());
        }
    }
}

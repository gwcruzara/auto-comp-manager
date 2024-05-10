namespace PI.Domain.Models
{
    public class Speed : BaseEntity
    {
        public double Time { get; set; }
        public int Ranking { get; set; }
        public double Score { get; set; }
        public int IdSquad { get; set; }
        public Squad Squad { get; set; }
        public IList<Penalties> Penalties { get; set; }
    }
}

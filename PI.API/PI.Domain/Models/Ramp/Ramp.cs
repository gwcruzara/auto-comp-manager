namespace PI.Domain.Models
{
    public class Ramp : BaseEntity
    {
        public double Distance { get; set; }
        public int Ranking { get; set; }
        public double Score { get; set; }
        public int IdSquad { get; set; }
        public Squad Squad { get; set; }
    }
}

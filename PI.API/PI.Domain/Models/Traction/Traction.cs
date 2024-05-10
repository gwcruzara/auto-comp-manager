namespace PI.Domain.Models
{
    public class Traction : BaseEntity
    {
        public double Weight { get; set; }     
        public int Ranking { get; set; }
        public double Score { get; set; }
        public int IdSquad { get; set; }
        public Squad Squad { get; set; }
    }
}

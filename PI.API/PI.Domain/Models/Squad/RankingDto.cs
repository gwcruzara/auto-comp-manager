namespace PI.Domain.Models
{
    public class RankingDto
    {
        public string SquadName { get; set; }
        public string CarNumber { get; set; }
        public int? Ranking { get; set; }
        public double Score { get; set; }
        public double? SpeedTime { get; set; }
        public double? RampDistance { get; set; }
        public double? TractionWeight { get; set; }
    }
}

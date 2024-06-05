namespace PI.Domain.Models
{
    public class StudentRankingDto
    {
        public string SquadName { get; set; }
        public string StudentName { get; set; }
        public int? Ranking { get; set; }
        public double Score { get; set; }
        public double? SpeedTime { get; set; }
        public double? RampDistance { get; set; }
        public double? TractionWeight { get; set; }
    }
}

namespace PI.Domain.Models
{
    public class Speed : BaseEntity
    {
        public double Time { get; set; }
        public double TimeWithoutPenalties { get; set; }
        public int Ranking { get; set; }
        public double Score { get; set; }
        public bool BurnedStart { get; set; }
        public int OutsideLine { get; set; }
        public int CutWay { get; set; }
        public int IdSquad { get; set; }
        public Squad Squad { get; set; }
    }
}

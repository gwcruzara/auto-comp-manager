namespace PI.Domain.Models
{
    public class SpeedDto
    {
        public double Time { get; set; }
        public int IdSquad { get; set; }
        public bool BurnedStart { get; set; }
        public int OutsideLine { get; set; }
        public int CutWay { get; set; }
    }
}

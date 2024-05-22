namespace PI.Domain.Models
{
    public class SpeedDto
    {
        public double Time { get; set; }
        public int IdSquad { get; set; }
        public bool BurnedStart { get; set; }
        public bool OutsideLine { get; set; }
        public bool CutWay { get; set; }
    }
}

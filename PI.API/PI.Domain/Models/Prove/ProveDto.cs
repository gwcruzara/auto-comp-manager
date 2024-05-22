namespace PI.Domain.Models.Prove
{
    public class ProveDto
    {
        public int SquadId { get; set; }
        public Ramp Ramp { get; set; }
        public Speed Speed { get; set; }
        public Traction Traction { get; set; }
    }
}

namespace PI.Domain.Models
{
    public class Squad : BaseEntity
    {
        public string Name { get; set; }
        public string CarNumber { get; set; }
        public IList<Ramp> Ramp { get; set; }
        public IList<Speed> Speed { get; set; }
        public IList<Traction> Traction { get; set; }
        public IList<Student> Student { get; set; }
    }
}

namespace PI.Domain.Models
{
    public class Squad : BaseEntity
    {
        public string Name { get; set; }
        public string CarNumber { get; set; }
        public List<Ramp>? Ramp { get; set; }
        public List<Speed>? Speed { get; set; }
        public List<Traction>? Traction { get; set; }
        public List<Student>? Student { get; set; }
    }
}

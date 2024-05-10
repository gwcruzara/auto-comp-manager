namespace PI.Domain.Models
{
    public class Student : BaseEntity
    {
        public string Name { get; set; }
        public string Job { get; set; }
        public int IdSquad { get; set; }
        public Squad Squad { get; set; }
    }
}


using PI.Domain.Models;

namespace PI.Domain.Interfaces
{
    public interface IStudentService
    {
        public Task<List<Student>> GetStudents();
        Student Create(StudentDto student);

    }
}

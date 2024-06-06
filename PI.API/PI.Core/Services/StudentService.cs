using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.Core.Services
{
    public class StudentService : IStudentService
    {
        private readonly AutoCompManagerContext _context;
        public StudentService(AutoCompManagerContext context)
        {
            _context = context;
        }

        public Task<List<Student>> GetStudents()
        {
            return _context.Students.Include(x => x.Squad).ToListAsync();
        }

        public Student Create(StudentDto student)
        {
            var createdStudent = new Student()
            {
                Name = student.Name,
                Job = student.Job,                
                IdSquad = student.IdSquad
            };

            _context.Students.Add(createdStudent);
            _context.SaveChanges();

            return createdStudent;
        }
    }
}

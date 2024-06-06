using Microsoft.AspNetCore.Mvc;
using PI.Core.Services;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        [Route("GetStudents")]
        public async Task<IList<Student>> GetStudents()
        {
            return await _studentService.GetStudents();
        }

        [HttpPost]
        [Route("Create")]
        public Student Create([FromBody] StudentDto student)
        {
            return _studentService.Create(student);
        }
    }
}

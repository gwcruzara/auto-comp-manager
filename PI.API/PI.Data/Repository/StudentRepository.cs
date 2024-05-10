using PI.Core.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PI.Data.Repository
{
    public class StudentRepository : BaseRepository, IStudentRepository
    {
        public StudentRepository(AutoCompManagerContext context) : base(context)
        {
        }
    }
}

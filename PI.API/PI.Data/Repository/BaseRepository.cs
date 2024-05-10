using Microsoft.Extensions.Configuration;
using PI.Core.DataContext;
using System.Data.SqlClient;

namespace PI.Data.Repository
{
    public abstract class BaseRepository
    {
        private readonly AutoCompManagerContext _context;
        public BaseRepository(AutoCompManagerContext context)
        {
            _context = context;
        }
    }
}

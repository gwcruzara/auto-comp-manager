using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Models;
using PI.Domain.Services;

namespace PI.Core.Services
{
    public class PenaltiesService : IPenaltiesService 
    {
        private readonly AutoCompManagerContext _context;

        public PenaltiesService(AutoCompManagerContext context) 
        {
            _context = context;
        }

        public Task<List<Penalties>> GetPenaltiesAsync()
        {
            var a = _context.Penalties.AsNoTracking().ToListAsync();

            return a;
        }
    }
}

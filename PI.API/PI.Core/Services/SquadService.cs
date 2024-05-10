using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.Core.Services
{
    public class SquadService : ISquadService
    {
        private readonly AutoCompManagerContext _context;

        public SquadService(AutoCompManagerContext context)
        {
            _context = context;
        }


        public async Task<List<Squad>> GetSquadList()
        {            
            return await _context.Squads.Include(x => x.Student).ToListAsync();
        }
    }
}

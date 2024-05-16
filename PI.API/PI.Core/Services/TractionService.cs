using PI.Core.DataContext;
using PI.Domain.Services;

namespace PI.Core.Services
{
    public class TractionService : ITractionService 
    {
        private readonly AutoCompManagerContext _context;

        public TractionService(AutoCompManagerContext context) 
        {
            _context = context;
        }
    }
}

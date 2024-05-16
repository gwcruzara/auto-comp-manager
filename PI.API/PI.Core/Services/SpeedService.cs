using PI.Core.DataContext;
using PI.Domain.Services;

namespace PI.Core.Services
{
    public class SpeedService : ISpeedService 
    {
        private readonly AutoCompManagerContext _context;

        public SpeedService(AutoCompManagerContext context) 
        {
            _context = context;
        }
    }
}

using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;
using static System.Formats.Asn1.AsnWriter;

namespace PI.Core.Services
{
    public class RampService : IRampService
    {
        private readonly AutoCompManagerContext _context;
        public RampService(AutoCompManagerContext context)
        {
            _context = context;
        }

        public async Task<Ramp> SaveRamp(RampDto ramp)
        {
            var rampToSave = new Ramp
            {
                IdSquad = ramp.IdSquad,
                Distance = ramp.Distance,
                Ranking = ramp.Ranking,
                Score = ramp.Score
            };

            if (rampToSave.Id == 0)
            {
                await _context.Ramps.AddAsync(rampToSave);
            }
            else 
            {
                _context.Ramps.Update(rampToSave);
            }

            await _context.SaveChangesAsync();

            return rampToSave;
        }
    }
}

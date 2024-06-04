using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Domain.Interfaces;
using PI.Domain.Models;

namespace PI.Core.Services
{
    public class RampService : IRampService
    {
        private readonly AutoCompManagerContext _context;
        public RampService(AutoCompManagerContext context)
        {
            _context = context;
        }

        public IQueryable<RankingDto> GetRanking()
        {
            return _context.Ramps.AsNoTracking()
            .Select(ramp => new RankingDto
            {
                SquadName = ramp.Squad.Name,
                CarNumber = ramp.Squad.CarNumber,
                Score = ramp.Score,
                Ranking = ramp.Ranking,
                RampDistance = ramp.Distance
            }).OrderBy(ramp => ramp.Ranking);            
        }

        public Ramp GetRamp(int squadId)
        {
            return _context.Ramps.AsNoTracking()
                .Where(ramp => ramp.IdSquad == squadId)
                .FirstOrDefault() ?? throw new Exception("Ramp not found");
        }

        public async Task<Ramp> SaveRamp(RampDto ramp)
        {
            var squadRamp = _context.Ramps.Where(x => x.IdSquad == ramp.IdSquad).FirstOrDefault();

            var listOfRamps = _context.Ramps.ToList();

            Ramp rampModifiedOrAdded;

            if (squadRamp != null)
            {
                squadRamp.Distance = ramp.Distance;
                rampModifiedOrAdded = squadRamp;
            }
            else
            {
                var rampToSave = new Ramp
                {
                    IdSquad = ramp.IdSquad,
                    Distance = ramp.Distance
                };

                listOfRamps.Add(rampToSave);
                rampModifiedOrAdded = rampToSave;
            }

            listOfRamps = listOfRamps.OrderByDescending(r => r.Distance).ToList();

            for (int i = 0; i < listOfRamps.Count; i++)
            {
                listOfRamps[i].Ranking = i + 1;
                listOfRamps[i].Score = GetScore(listOfRamps[i].Ranking);
            }

            await _context.BulkInsertOrUpdateAsync(listOfRamps);

            return rampModifiedOrAdded;
        }


        private double GetScore(int ranking)
        {
            List<int> topRanking = new List<int> { 1, 2, 3 };
            List<int> secondRanking = new List<int> { 4, 5, 6 };
            List<int> thirdRanking = new List<int> { 7, 8 };
            List<int> fourtyRanking = new List<int> { 9, 10, 11, 12, 13, 14, 15 };

            if (topRanking.Contains(ranking))
            {
                return 1.0;
            }
            
            if (secondRanking.Contains(ranking))
            {
                return 0.8;
            }
            
            if (thirdRanking.Contains(ranking))
            {
                return 0.6;
            }
            
            if (fourtyRanking.Contains(ranking))
            {
                return 0.4;
            }

            return 0.0;
        }
    }
}
